import NextHead from "next/head";

interface HeadProps {
  title: string;
  description?: string;
}

export const Head = ({ title, description }: HeadProps) => {
  const fullTitle = `OnlyShops | ${title}`;

  return (
    <NextHead>
      <title>{fullTitle}</title>

      <meta
        name="description"
        content={
          description ?? "OnlyShops | Your one-stop shop for all your needs"
        }
      />
    </NextHead>
  );
};
