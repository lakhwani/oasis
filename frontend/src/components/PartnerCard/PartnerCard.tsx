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
import SocialButton from "../SocialButton/SocialButton";
import { FaLink } from "react-icons/fa6";
import PartnerAccordion from "./PartnerAccordion";

type PartnerCardProps = {
  name: string;
  type: string;
  description: string;
  founded: number;
  country: string;
  link: string;
  address: string;
  note: string;
};

export default function PartnerCard({
  name,
  type,
  description,
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
        minH="20rem"
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
            {type}
          </Text>
          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {name}
          </Heading>
          <Text color={"gray.600"}>Founded: {founded}</Text>
          <Text color={"gray.600"}>{description}</Text>
          <PartnerAccordion countries={country}></PartnerAccordion>
        </Stack>

        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <SocialButton label={"Github"} href={link}>
            <FaLink />
          </SocialButton>
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={400}>ETH Address:</Text>
            <Text fontSize="xs" color={"gray.600"}>
              {address}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
