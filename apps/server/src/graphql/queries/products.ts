import { gql } from "graphql-request";

export const productsQuery = gql`
  query Products($locale: Locale!) {
    products(locales: [$locale]) {
      id
      name
      slug
      description
      price
      images(locales: [en], first: 1) {
        url
      }
      inStock
      categories {
        name
      }
    }
  }
`;

export type ProductsQueryResponse = {
  products: {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    images: {
      url: string;
    }[];
    inStock: boolean;
    categories: {
      name: string;
    }[];
  }[];
};
