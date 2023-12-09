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

export default function FundTracker() {
  // Example data - you'll replace this with real data
  const totalFundsRaised = 25; // Example total funds raised
  const recentDistributions = [
    { partner: "GiveDirectly", amount: 2.23, date: "2023-01-01" },
    { partner: "Save the Children", amount: 3.2, date: "2023-02-15" },
  ];

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
          {totalFundsRaised.toLocaleString()} ETH
        </Text>
        <Progress
          colorScheme="blue"
          size="lg"
          value={(totalFundsRaised / 100) * 100}
          mt={4}
        />

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
