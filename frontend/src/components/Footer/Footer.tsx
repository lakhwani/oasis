"use client";

import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { MdDeveloperMode } from "react-icons/md";
import SocialButton from "@/components/SocialButton/SocialButton";

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text fontSize={"sm"}>
          © 2023 Oasis Relief Fund. All rights reserved.
        </Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton
            label={"Github"}
            href={"https://github.com/lakhwani/oasis/"}
          >
            <FaGithub />
          </SocialButton>
          <SocialButton
            label={"Devpost"}
            href={"https://devpost.com/software/oasis-fund-relief"}
          >
            <MdDeveloperMode />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
