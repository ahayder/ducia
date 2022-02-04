import React from "react";
import { MoralisProvider } from "react-moralis";
import Head from "next/head";
import { MoralisDappProvider } from "../providers/MoralisDappProvider/MoralisDappProvider";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../styles/globals.scss";
import { Layout } from "../components/Layout";

const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const isServerInfo = Boolean(APP_ID && SERVER_URL);

const theme = extendTheme({
  colors: {
    purple: {
      50: "#EAEAFB",
      100: "#C4C5F3",
      200: "#9DA0EB",
      300: "#777BE4",
      400: "#5155DC",
      500: "#2B30D4",
      600: "#2227AA",
      700: "#1A1D7F",
      800: "#111355",
      900: "#090A2B",
    },
    cyan: {
      50: "#E5FFFF",
      100: "#B8FFFF",
      200: "#8AFFFF",
      300: "#5CFFFF",
      400: "#2EFFFF",
      500: "#00FFFF",
      600: "#00CCCC",
      700: "#009999",
      800: "#006666",
      900: "#003333",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ducia</title>
      </Head>
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <MoralisDappProvider>
          <ChakraProvider>
            <Layout>
              <Component {...pageProps} isServerInfo={isServerInfo} />
            </Layout>
          </ChakraProvider>
        </MoralisDappProvider>
      </MoralisProvider>
    </>
  );
}

export default MyApp;
