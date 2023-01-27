import { ApolloProvider } from "@apollo/client";
import algoliasearch from "algoliasearch/lite";
import { AnimatePresence } from "framer-motion";
import { AppProps } from "next/app";
import type { AppType } from "next/dist/shared/lib/utils";
import { Toaster } from "react-hot-toast";
import { InstantSearch } from "react-instantsearch-hooks-web";

import { Navbar } from "@/components";
import { AuthProvider, CartProvider } from "@/contexts";
import { apolloClient } from "@/libs";
import "../styles/globals.css";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY!
);

const MyApp: AppType = ({ Component, pageProps, router }: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <InstantSearch searchClient={searchClient} indexName="products">
          <CartProvider>
            <Navbar />

            <Toaster />

            <AnimatePresence
              mode="wait"
              initial={false}
              onExitComplete={() => window.scrollTo(0, 0)}
            >
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </CartProvider>
        </InstantSearch>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default MyApp;
