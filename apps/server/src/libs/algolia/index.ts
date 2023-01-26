import algoliasearch from "algoliasearch";

const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_KEY!
);

export const indexes = ["products"];

export const productIndex = algolia.initIndex("products");
