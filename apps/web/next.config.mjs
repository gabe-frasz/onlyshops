/** @type {import("next").NextConfig} */

const config = {
  reactStrictMode: true,
  swcMinify: true,
  // transpilePackages: ["zod-schemas"],
  i18n: {
    locales: ["en", "pt-BR"],
    defaultLocale: "en",
  },
  images: {
    domains: [
      "https://lh2.googleusercontent.com",
      "github.com",
      "media.graphassets.com",
    ],
  },
};

export default config;
