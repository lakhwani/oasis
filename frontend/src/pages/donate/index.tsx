"use client";

import DonateBox from "@/components/DonateBox/DonateBox";
import { Box, Text, Stack, Heading, Container } from "@chakra-ui/react";

export default function Home() {
  return (
    <div>
      <Box>
        <DonateBox></DonateBox>
      </Box>
    </div>
  );
}
