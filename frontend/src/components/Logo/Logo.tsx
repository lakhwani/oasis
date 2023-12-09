"use client";

import { Image, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

type LogoProps = {
  src: string; // The path to the logo image file
};

const Logo: React.FC<LogoProps> = ({ src }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/"); // Redirects to the homepage
  };

  return (
    <Box as="button" onClick={handleClick}>
      <Image src={src} alt="Logo" htmlWidth="40px" objectFit="contain" />
    </Box>
  );
};

export default Logo;
