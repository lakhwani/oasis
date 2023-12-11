"use client";

import {
  Box,
  Text,
  Stack,
  Heading,
  Container,
  Progress,
  List,
  ListItem,
  Link,
  Divider,
} from "@chakra-ui/react";
import { ethers, formatEther } from "ethers";
import { useState, useEffect } from "react";
import { mainContractABI, mainContractAddress } from "@/utils/constants";

interface DonationEvent {
  contributor: string;
  amount: string;
  date: string;
}

export default function FundTracker() {
  // Example data - you'll replace this with real data
  const recentDistributions = [
    { partner: "GiveDirectly", amount: 2.23, date: "2023-01-01" },
    { partner: "Save the Children", amount: 3.2, date: "2023-02-15" },
  ];

  const [totalFundsRaised, setTotalFundsRaised] = useState<number>(1);
  const [recentDonations, setRecentDonations] = useState([]);

  useEffect(() => {
    const fetchPoolAndEvents = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          // Request the user's wallet to connect if it's not already available
          await window.ethereum.request({ method: "eth_requestAccounts" });

          // Create a new instance of the ethers.js provider to interact with the Ethereum network
          const provider = new ethers.BrowserProvider(window.ethereum);

          // Get the signer from the provider, which is the connected account
          const signer = await provider.getSigner();

          const contractAddress = mainContractAddress;
          const contractABI = mainContractABI;

          // Create a new instance of the contract with the signer, which allows updating methods
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          const pool = await contract.pool();
          setTotalFundsRaised(parseFloat(formatEther(pool)));

          const donationEvents = await contract.queryFilter(
            contract.filters.DonationMade()
          );

          const donationsWithDates = (
            await Promise.all(
              donationEvents.map(async (event: any) => {
                const block = await provider.getBlock(event.blockNumber);
                if (block) {
                  return {
                    contributor: event.args.contributor,
                    amount: formatEther(event.args.amount),
                    date: new Date(block.timestamp * 1000),
                  };
                }
              })
            )
          ).filter(
            (donation): donation is DonationEvent => donation !== undefined
          );

          // Sort the donations by date in descending order
          donationsWithDates.sort(
            (a, b) => b.date.getTime() - a.date.getTime()
          );

          // Convert dates to string for display
          const sortedDonations = donationsWithDates.map((donation) => ({
            ...donation,
            date: donation.date.toLocaleDateString(),
          }));

          setRecentDonations(sortedDonations);
        } catch (error) {
          console.error("Failed to fetch pool or events:", error);
        }
      } else {
        console.log("Ethereum object not found, install MetaMask.");
      }
    };

    fetchPoolAndEvents();
  }, []);

  return (
    <Container maxW={"6xl"} py={12}>
      <Stack spacing={3} align={"center"}>
        <Heading fontSize={"4xl"}>Fund Tracker</Heading>
        <Text fontSize={"md"} color={"gray.600"} align={"center"}>
          Here's how the funds have currently been allocated and distributed.
        </Text>
      </Stack>
      <Box py={6}>
        <Heading fontSize={"2xl"} mb={4}>
          Total Funds Raised:
        </Heading>
        <Text fontSize={"xl"} color={"blue.500"}>
          {totalFundsRaised} ETH
        </Text>
        <Progress
          colorScheme="blue"
          size="lg"
          value={totalFundsRaised * 100}
          mt={4}
        />

        <Heading fontSize={"2xl"} mt={8} mb={4}>
          Recent Donations:
        </Heading>
        <List spacing={3}>
          {recentDonations.map((donation, index) => (
            <ListItem key={index}>
              <Text fontSize={"md"}>
                <strong>Contributor:</strong> {donation.contributor}
              </Text>
              <Text fontSize={"md"}>
                <strong>Amount:</strong> {donation.amount} ETH
              </Text>
              <Text fontSize={"md"}>
                <strong>Date:</strong> {donation.date}
              </Text>
              <Divider my={4} />
            </ListItem>
          ))}
        </List>

        <Heading fontSize={"2xl"} mt={8} mb={4}>
          Recent Distributions:
        </Heading>
        <List spacing={3}>
          {recentDistributions.map((dist, index) => (
            <ListItem key={index}>
              <Text fontSize={"md"}>
                <strong>Partner:</strong> {dist.partner}
              </Text>
              <Text fontSize={"md"}>
                <strong>Amount:</strong> {dist.amount.toLocaleString()} ETH
              </Text>
              <Text fontSize={"md"}>
                <strong>Date:</strong> {dist.date}
              </Text>
              <Divider my={4} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
