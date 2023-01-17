/** @type {import("next").NextConfig} */

const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en", "pt-BR"],
    defaultLocale: "en",
  },
};

export default config;
