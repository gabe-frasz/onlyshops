import { AnimatePresence } from "framer-motion";
import { AppProps } from "next/app";
import type { AppType } from "next/dist/shared/lib/utils";

import { Navbar } from "@/components";
import { AuthProvider } from "@/contexts";
import { apolloClient } from "@/libs";
import { ApolloProvider } from "@apollo/client";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps, router }: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Navbar />

        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default MyApp;
