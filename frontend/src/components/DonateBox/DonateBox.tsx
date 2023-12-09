"use client";

import { useMetamask } from "@/hooks/useMetamask";
import { ethers, parseEther } from "ethers";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { mainContractABI, mainContractAddress } from "@/utils/constants";
import Link from "next/link";

export default function DonateBox() {
  const [donationAmount, setDonationAmount] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const { state } = useMetamask();
  const toast = useToast();

  const handleDonation = async () => {
    if (!isTermsAccepted) {
      toast({
        title: "Terms not accepted",
        description: "You must accept the terms and conditions to proceed.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    if (isNaN(parseFloat(donationAmount)) || parseFloat(donationAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid donation amount greater than zero.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    if (!window.ethereum) {
      toast({
        title: "MetaMask is not installed",
        description:
          "Please install MetaMask in your browser to make a donation.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

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

      // Call the makeDonation function from the contract
      const tx = await contract.makeDonation({
        value: parseEther(donationAmount),
      });

      // Wait for the transaction to be confirmed
      await tx.wait();
      toast({
        title: "Donation Successful",
        description: "Your donation has been processed.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Donation Failed",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex align={"center"} justify={"center"} minW="100">
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Donation Box </Heading>
          <Text fontSize={"md"} color={"gray.600"} align={"center"}>
            Make a donation that is securely stored in our smart contract, and
            contribute to our list of partners today.
          </Text>
          <Text fontSize={"sm"} color={"gray.600"} align={"center"}>
            To learn more about our partners, click{" "}
            <Link href={"/partners"}>
              <u>here</u>
            </Link>
            .
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Amount to Donate:</FormLabel>
              <Input
                type="text"
                placeholder="Enter donation amount in ETH"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox
                  isChecked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                >
                  I understand the terms and conditions.
                </Checkbox>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{ bg: "blue.500" }}
                onClick={handleDonation}
                isDisabled={
                  !isTermsAccepted || !(parseFloat(donationAmount) > 0)
                }
              >
                Make a Donation
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
