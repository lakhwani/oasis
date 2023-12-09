// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 * 
 * sepolia: https://faucets.chain.link/sepolia
 */

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/utils/Strings.sol";

contract DisasterCrowdfunding is ChainlinkClient, Ownable {

    using Chainlink for Chainlink.Request;
    using Strings for uint256;

    uint256 public pool;
    uint256 constant share = 50;

    mapping(string => address[]) walletByLocation;

    bytes32 private jobIdForHandler;
    uint256 private feeForHandler;

    bytes32 private jobId;
    uint256 private fee;

    string private processing; // depression :(

    event HandlerRequestMade(bytes32 requestId);
    event LocationRequestMade(bytes32 requestId);
    event HandlerRequestProcessed(bytes32 requestId);
    event LocationRequestProcessed(bytes32 requestId);

    constructor() Ownable(msg.sender) {

        // reference: https://docs.chain.link/resources/link-token-contracts
        setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789); // sepolia

        // reference: https://docs.chain.link/any-api/testnet-oracles
        setChainlinkOracle(0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD); // sepolia
        jobId = "7da2702f37fd48e5b1b9a5715e3509b6"; // GET > bytes

        fee = (1 * LINK_DIVISIBILITY) / 10; // TODO ????

        jobIdForHandler = "ca98366cc7314957b8c012c72f05aeeb"; // GET > uint256
        feeForHandler = (1 * LINK_DIVISIBILITY) / 10; // TODO ????
    }

    function makeDonation() external payable {
        pool += msg.value;
    }

    function addVerifiedWallet(string memory location, address verifiedWallet) public onlyOwner {
        walletByLocation[location].push(verifiedWallet);
    }

    // date format: 2023-09-01 00:00:00
    // pass in the entire url because solidity does not support string concatenation: "https://api.ambeedata.com/disasters/history?from="+date+"&page=1"
    function checkForPayout(string memory url) public {
        Chainlink.Request memory request = buildChainlinkRequest(jobIdForHandler, address(this), this.fulfillHandler.selector);
        request.add("get", url);
        request.add("path", "result,length");

        bytes32 requestId = sendChainlinkRequest(request, feeForHandler);
        emit HandlerRequestMade(requestId);
    }

    function fulfillHandler(bytes32 requestId, uint256 n) public recordChainlinkFulfillment(requestId) {
        emit HandlerRequestProcessed(requestId);
        
        for (uint256 i = 0; i < n; i++) {
            Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
            request.add("get", processing);
            request.add("path", string(abi.encodePacked("result,", n.toString(), ",country")));
            
            bytes32 newRequestId = sendChainlinkRequest(request, fee);
            emit LocationRequestMade(newRequestId);
        }
    }

    function fulfill(bytes32 requestId, bytes32 result) public recordChainlinkFulfillment(requestId) {
        emit LocationRequestProcessed(requestId);

        string memory location = bytes32ToString(result);
        performPayout(location);
    }

    // reference: https://gist.github.com/alexroan/a8caf258218f4065894ecd8926de39e7
    function bytes32ToString(bytes32 _bytes32) public pure returns (string memory) {
        uint8 i = 0;
        while(i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }

    function performPayout(string memory location) public {

        uint256 amount = (pool * share) / 100;
        if (amount > address(this).balance) {
            amount = address(this).balance;
        }

        uint256 numberOfWallets = walletByLocation[location].length;
        require(numberOfWallets > 0, "no verified wallets for this location");

        uint256 x = amount / numberOfWallets;

        for (uint256 i = 0; i < numberOfWallets; i++) {
            payable(walletByLocation[location][i]).transfer(x);
        }

        pool -= amount;
    }
}
