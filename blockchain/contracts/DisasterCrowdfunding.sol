// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 * 
 * sepolia: https://faucets.chain.link/sepolia
 */

/**
 *  TODO
 * 
 * - how to estimate fee????
 * - parseJSON
 * - make ownable + set addVerifiedWallet to onlyOwner
 * - testing
 * 
 * 
 */

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract DisasterCrowdfunding is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    uint256 public pool;
    uint256 constant share = 50;

    mapping(string => address[]) walletByLocation;

    bytes32 private jobId;
    uint256 private fee;

    event RequestPayoutCheck(bytes32 indexed requestId);

    constructor() {

        // reference: https://docs.chain.link/resources/link-token-contracts
        setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789); // sepolia

        // reference: https://docs.chain.link/any-api/testnet-oracles
        setChainlinkOracle(0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD); // sepolia
        jobId = "7da2702f37fd48e5b1b9a5715e3509b6"; // GET > bytes

        fee = (1 * LINK_DIVISIBILITY) / 10; // TODO ????
    }

    function makeDonation() external payable {
        pool += msg.value;
    }

    function addVerifiedWallet(string memory location, address verifiedWallet) public {
        walletByLocation[location].push(verifiedWallet);
    }

    // date format: 2023-09-01 00:00:00
    // pass in the entire url because solidity does not support string concatenation: "https://api.ambeedata.com/disasters/history?from="+date+"&page=1"
    function checkForPayout(string memory url) public {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        request.add("get", url);

        bytes32 requestId = sendChainlinkRequest(request, fee);
        emit RequestPayoutCheck(requestId);
    }

    function fulfill(bytes32 requestId, bytes memory result) public recordChainlinkFulfillment(requestId) {

    // sample response:
    // {
    //     "message": "success",
    //     "result": [
    //         {
    //             "polygonlabel": "Global area",
    //             "geometry": {
    //                 "type": "Point",
    //                 "coordinates": [
    //                     -3.836608162668696,
    //                     40.212051450000004
    //                 ]
    //             },
    //             "event_type": "FL",
    //             "name": "Flood in Spain",
    //             "alert_level": "Green",
    //             "active": true,
    //             "country": "Spain",
    //             "start_date": "2023-09-02 13:00:00",
    //             "end_date": "2023-09-18 01:00:00",
    //             "countrycode": "ESP",
    //             "severity": 0,
    //             "severity_description": "Magnitude 0 ",
    //             "unit": "",
    //             "details": {
    //                 "Death": "3",
    //                 "Displaced": "6",
    //                 "Countries": "Spain",
    //                 "From - To": "02 Sep - 18 Sep"
    //             },
    //             "continent": "eur",
    //             "eventid1": 1102202,
    //             "polygondate": "2023-10-30 04:15:41"
    //         }
    //    ]
    // }

        string memory data = bytes32ToString(result);
        int n = parseJSON(data, "get,length,somehow"); //TODO

        // for loop through events
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
