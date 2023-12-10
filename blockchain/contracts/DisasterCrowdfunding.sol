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

contract DisasterCrowdfunding is ChainlinkClient, Ownable {

    using Chainlink for Chainlink.Request;
    
    uint256 public pool;
    uint256 constant share = 10;

    mapping(string => address[]) walletByLocation;
    address[] verifiedWallets;

    bytes32 private jobId;
    uint256 private fee;

    event RequestMade(bytes32 requestId);
    event RequestProcessed(bytes32 requestId);

    event DonationMade(address contributor, uint256 amount);

    constructor() Ownable(msg.sender) {

        // reference: https://docs.chain.link/resources/link-token-contracts
        setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789); // sepolia

        // reference: https://docs.chain.link/any-api/testnet-oracles
        setChainlinkOracle(0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD); // sepolia
        jobId = "7da2702f37fd48e5b1b9a5715e3509b6"; // GET > bytes

        fee = (1 * LINK_DIVISIBILITY) / 10; // TODO ????
    }

    function makeDonation() external payable {
        pool += msg.value;
        
        emit DonationMade(msg.sender, msg.value);
    }

    function addVerifiedWallet(string memory location, address verifiedWallet) public onlyOwner {
        walletByLocation[location].push(verifiedWallet);
        verifiedWallets.push(verifiedWallet);
    }

    // pass in the entire url because solidity does not support string concatenation: "https://api.predicthq.com/v1/events/?category=disasters&active.gte=2023-12-09T00:00:00&active.lte=2023-12-09T23:59:59"
    // pass in "Bearer <ACCESS TOKEN>"
    function checkForPayout(string memory url, string memory accessToken) public {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        request.add("get", url);
        request.add("Authorization", accessToken);
        request.add("path", "result,0,country");

        bytes32 requestId = sendChainlinkRequest(request, fee);
        emit RequestMade(requestId);
    }

    function fulfill(bytes32 requestId, bytes memory result) public recordChainlinkFulfillment(requestId) {
        emit RequestProcessed(requestId);

        string memory location = string(result);
        performPayout(location);
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

    function performMonthlyPayout() public {

        uint256 amount = pool / 100;
        if (amount > address(this).balance) {
            amount = address(this).balance;
        }

        uint256 numberOfWallets = verifiedWallets.length;
        require(numberOfWallets > 0, "no verified wallets for this location");

        uint256 x = amount / numberOfWallets;

        for (uint256 i = 0; i < numberOfWallets; i++) {
            payable(verifiedWallets[i]).transfer(x);
        }

        pool -= amount;
    }
}
