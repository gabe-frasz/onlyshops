import NextHead from "next/head";

interface HeadProps {
  title: string;
  description?: string;
}

export const Head = ({ title, description }: HeadProps) => {
  return (
    <NextHead>
      <title>OnlyShops | {title}</title>
      <meta
        name="description"
        content={
          description ?? "OnlyShops | Your one-stop shop for all your needs"
        }
      />
    </NextHead>
  );
};
