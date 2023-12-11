import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { MetamaskProvider } from "@/hooks/useMetamask";
import { ChakraProvider, Flex, Container, Box } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <MetamaskProvider>
        <Flex direction="column" minH="100vh">
          <Navbar></Navbar>
          <Box minH="87vH">
            <Component {...pageProps} />
          </Box>
          <Footer></Footer>
        </Flex>
      </MetamaskProvider>
    </ChakraProvider>
  );
}
