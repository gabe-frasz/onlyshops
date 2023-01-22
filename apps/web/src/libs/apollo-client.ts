import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://api-sa-east-1.hygraph.com/v2/clczce4hn4b0a01ukejgw1gz6/master",
  cache: new InMemoryCache(),
});
