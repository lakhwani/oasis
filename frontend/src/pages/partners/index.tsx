"use client";

import DonateBox from "@/components/DonateBox/DonateBox";
import PartnerCard from "@/components/PartnerCard/PartnerCard";
import {
  Box,
  Text,
  Stack,
  Heading,
  Container,
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import { partners } from "@/utils/constants";

export default function Home() {
  return (
    <div>
      <Box>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={3}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Non-Profits & Partners </Heading>
            <Text fontSize={"md"} color={"gray.600"} align={"center"}>
              Make a donation that is securely stored in our smart contract, and
              contribute to our list of partners today.
            </Text>
            <Text fontSize={"sm"} color={"gray.600"} align={"center"}>
              To become a partner, click{" "}
              <Link href={"https://forms.gle/C6aZkZgQZXSdaKqk8"} isExternal>
                <u>here</u>
              </Link>
            </Text>
          </Stack>
        </Stack>
        <Container minWidth="55rem">
          <SimpleGrid columns={[1, 2]} spacing={10}>
            {partners.map((partner) => (
              <PartnerCard
                key={partner.name}
                type={partner.type}
                description={partner.description}
                name={partner.name}
                founded={partner.founded}
                country={partner.country}
                link={partner.link}
                address={partner.address}
                note={partner.note}
              />
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </div>
  );
}
