import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { ChakraProvider, Flex, Container } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Flex direction="column" minH="100vh">
        <Navbar></Navbar>
        <Container flex="1">
          <Component {...pageProps} />
        </Container>
        <Footer></Footer>
      </Flex>
    </ChakraProvider>
  );
}
