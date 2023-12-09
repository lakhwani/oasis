"use client";

import Image from "next/image";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";

type PartnerCardProps = {
  name: string;
  founded: number;
  country: string;
  link: string;
  address: string;
  note: string;
};

export default function PartnerCard({
  name,
  founded,
  country,
  link,
  address,
  note,
}: PartnerCardProps) {
  return (
    <Center py={6}>
      <Box
        maxW={"500px"}
        w={"full"}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box
          h={"20px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        ></Box>
        <Stack>
          <Text
            color={"blue.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            Blog
          </Text>
          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {name}
          </Heading>
          <Text color={"gray.500"}>Founded: {founded}</Text>
          <Text color={"gray.500"}>Countries Supported: {country}</Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar
            src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
          />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>Achim Rolle</Text>
            <Text color={"gray.500"}>Feb 08, 2021 · 6min read</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
