import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { AppProps } from "next/app";
import type { AppType } from "next/dist/shared/lib/utils";

import "../styles/globals.css";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

export const theme = extendTheme({ config });

const MyApp: AppType = ({ Component, pageProps, router }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </ChakraProvider>
  );
};

export default MyApp;
