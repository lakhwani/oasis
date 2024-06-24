// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 * 
 * sepolia: https://faucets.chain.link/sepolia
 */

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "solmate/src/utils/FixedPointMathLib.sol";
import "solmate/src/utils/ReentrancyGuard.sol";

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract DisasterCrowdfunding is ERC20, ChainlinkClient, ReentrancyGuard {

    using FixedPointMathLib for uint256;
    using Chainlink for Chainlink.Request;

    event DonationMade(address contributor, uint256 amount);
    event Vote(uint256 proposalId, address voter, uint256 votes, uint256 timestamp);
    event MakeProposal(uint256 proposalId, string which, uint256 timestamp);
    event ExecuteProposal(uint256 proposalId, string which, uint256 approved, uint256 timestamp);

    uint256 public value;

    uint256 public payoutPercentage = 10;
    uint256 public dividendPercentage = 10;

    uint256 public dividendTimestamp = 0;
    uint256 public dividendDelay = 30 days;

    address[] public verifiedWallets;
    mapping(string => address[]) public walletByLocation;

    uint256 public proposalId = 0;

    struct Data {
        string location;
        address verifiedWallet;
        uint256 payoutPercentage;
        uint256 dividendPercentage;
        uint256 dividendDelay;
    }

    struct Proposal {
        uint256 id;
        string which;
        Data data;
        uint256 before;
        uint256 approved;
        bool executed;
    }

    Proposal[] public proposals;
    mapping (uint256 => mapping(address => bool)) public voted;

    event RequestProcessed(bytes32 requestId);
    event RequestMade(bytes32 requestId);

    bytes32 private jobId;
    uint256 private fee;

    constructor() ERC20("Oasis", "OAS") {

        // reference: https://docs.chain.link/resources/link-token-contracts
        setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789); // sepolia

        // reference: https://docs.chain.link/any-api/testnet-oracles
        setChainlinkOracle(0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD); // sepolia
        jobId = "7da2702f37fd48e5b1b9a5715e3509b6"; // GET > bytes

        fee = (1 * LINK_DIVISIBILITY).mulWadDown(10);
    }

    function makeDonation() external payable nonReentrant {

        // make donation
        value += msg.value;
        _mint(msg.sender, msg.value);

        emit DonationMade(msg.sender, msg.value);
    }

    function proposeAddVerifiedWallet(string memory _location, address _verifiedWallet) public {
        
        // make proposal to add verified wallet
        proposals.push(Proposal({
            id: proposalId,
            which: "addVerifiedWallet(Data)", 
            data: Data({
                location: _location,
                verifiedWallet: _verifiedWallet,
                payoutPercentage: 0,
                dividendPercentage: 0,
                dividendDelay: 0
            }),
            before: block.timestamp + 7 days,
            approved: 0,
            executed: false
        }));
        proposalId++;
        emit MakeProposal(proposalId, "addVerifiedWallet", block.timestamp);

    }

    function checkForPayout(string memory url) public nonReentrant {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.proposePerformPayout.selector);
        
        // api: https://www.predicthq.com/events/disasters
        request.add("get", url);
        request.add("path", "result,0,country");

        bytes32 requestId = sendChainlinkRequest(request, fee);
        emit RequestMade(requestId);

        _mint(msg.sender, 10); // compensate for maintaining 
    }

    function proposePerformPayout(bytes32 requestId, bytes memory result) public nonReentrant recordChainlinkFulfillment(requestId) {
        emit RequestProcessed(requestId);

        // get location
        string memory _location = string(result);

        // make proposal to perform payout
        proposals.push(Proposal({
            id: proposalId,
            which: "performPayout(Data)", 
            data: Data({
                location: _location,
                verifiedWallet: address(0),
                payoutPercentage: 0,
                dividendPercentage: 0,
                dividendDelay: 0
            }),
            before: block.timestamp + 7 days,
            approved: 0,
            executed: false
        }));
        proposalId++;
        emit MakeProposal(proposalId, "performPayout", block.timestamp);

    }

    function proposeChangePayoutPercentage(uint256 _payoutPercentage) public {

        // make proposal to change payout percentage
        proposals.push(Proposal({
            id: proposalId,
            which: "changePayoutPercentage(Data)", 
            data: Data({
                location: "",
                verifiedWallet: address(0),
                payoutPercentage: _payoutPercentage,
                dividendPercentage: 0,
                dividendDelay: 0
            }),
            before: block.timestamp + 7 days,
            approved: 0,
            executed: false
        }));
        proposalId++;
        emit MakeProposal(proposalId, "changePayoutPercentage", block.timestamp);

    }

    function proposeChangeDividendPercentage(uint256 _dividendPercentage) public {

        // make proposal to change dividend percentage
        proposals.push(Proposal({
            id: proposalId,
            which: "changeDividendPercentage(Data)", 
            data: Data({
                location: "",
                verifiedWallet: address(0),
                payoutPercentage: 0,
                dividendPercentage: _dividendPercentage,
                dividendDelay: 0
            }),
            before: block.timestamp + 7 days,
            approved: 0,
            executed: false
        }));
        proposalId++;
        emit MakeProposal(proposalId, "changeDividendPercentage", block.timestamp);

    }

    function proposeChangeDivididendDelay(uint256 _dividendDelay) public {

        // make proposal to change dividend delay
        proposals.push(Proposal({
            id: proposalId,
            which: "changeDividendDelay(Data)", 
            data: Data({
                location: "",
                verifiedWallet: address(0),
                payoutPercentage: 0,
                dividendPercentage: 0,
                dividendDelay: _dividendDelay
            }),
            before: block.timestamp + 7 days,
            approved: 0,
            executed: false
        }));
        proposalId++;
        emit MakeProposal(proposalId, "changeDividendDelay", block.timestamp);

    }

    function vote(uint256 _proposalId) public {

        // get proposal
        Proposal storage proposal = proposals[_proposalId];

        require(!proposal.executed, "Already executed");
        require(!voted[_proposalId][msg.sender], "Already voted");
        require(block.timestamp <= proposal.before, "Too late");

        // vote for proposal
        proposal.approved += balanceOf(msg.sender);
        voted[_proposalId][msg.sender] = true;

        emit Vote(_proposalId, msg.sender, balanceOf(msg.sender), block.timestamp);

    }

    function executeProposal(uint256 _proposalId) public {
        Proposal storage proposal = proposals[_proposalId];

        // if proposal is approved (more than 50% approval)
        if (proposal.approved >= totalSupply().divWadDown(2)) {

            // execute proposal
            bytes memory data = abi.encodeWithSignature(proposal.which, proposal.data);
            (bool success, ) = address(this).call(data);
            proposal.executed = success;
            
            if (success) {
                emit ExecuteProposal(_proposalId, proposal.which, proposal.approved, block.timestamp);
            }
            
        }

    }

    function addVerifiedWallet(Data memory _data) private {

        string memory _location = _data.location;
        address _verifiedWallet = _data.verifiedWallet;

        // add verified wallet
        walletByLocation[_location].push(_verifiedWallet);
        verifiedWallets.push(_verifiedWallet);

    }

    function performPayout(Data memory _data) private {

        string memory _location = _data.location;

        // calculate amount
        uint256 _amount = value.mulWadDown(payoutPercentage).mulWadDown(100);
        if (_amount > address(this).balance) {
            _amount = address(this).balance;
        }

        uint256 _numberOfWallets = walletByLocation[_location].length;
        require(_numberOfWallets > 0, "No verified wallets for this location");

        // calculate amount for each wallet
        uint256 x = _amount / _numberOfWallets;

        // perform payout
        for (uint256 i = 0; i < _numberOfWallets; i++) {
            payable(walletByLocation[_location][i]).transfer(x);
        }

        value = address(this).balance;
    }

    function changePayoutPercentage(Data memory _data) private {

        // change payout percentage
        uint256 _payoutPercentage = _data.payoutPercentage;
        payoutPercentage = _payoutPercentage;
    }

    function changeDividendPercentage(Data memory _data) private {

        // change dividend percentage
        uint256 _dividendPercentage = _data.dividendPercentage;
        dividendPercentage = _dividendPercentage;

    }

    function changeDividendDelay(Data memory _data) private {

         // change dividend delay
        uint256 _dividendDelay = _data.dividendDelay;
        dividendDelay = _dividendDelay;
    }

    function performMonthlyPayout() public {

        require(block.timestamp > dividendTimestamp + dividendDelay, "Too early");

        // calculate amount
        uint256 _amount = value.mulWadDown(dividendPercentage).mulWadDown(100);
        if (_amount > address(this).balance) {
            _amount = address(this).balance;
        }

        uint256 _numberOfWallets = verifiedWallets.length;
        require(_numberOfWallets > 0, "No verified wallets");

        // calculate amount for each wallet
        uint256 x = _amount.divWadDown(_numberOfWallets);

        // perform payout
        for (uint256 i = 0; i < _numberOfWallets; i++) {
            payable(verifiedWallets[i]).transfer(x);
        }

        value = address(this).balance;
        dividendTimestamp = block.timestamp;
    }

}