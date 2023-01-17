import { ColorModeScript } from "@chakra-ui/react";
import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import { theme } from "./_app";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <link
          href="https://onlyshops.vercel.app/"
          rel="alternate"
          hrefLang="en"
        />
        <link
          href="https://onlyshops.vercel.app/pt-BR/"
          rel="alternate"
          hrefLang="pt-BR"
        />

        <link
          href="/favicon.ico"
          rel="shortcut icon"
          type="image/ico"
          sizes="16x16"
        />

        <meta name="theme-color" content="#6419e6" />

        <Script
          strategy="beforeInteractive"
          src="https://polyfill.io/v3/polyfill.min.js"
        />

        {/*
          <meta name="application-name" content="Next.js template with bash scripts" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-status-bar" content="#6419e6" />
          <meta name="apple-mobile-web-app-title" content="Next.js template with bash scripts" />

          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/icons/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#6419e6" />
          <meta name="msapplication-tap-highlight" content="no" />

          // icons and manifest
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
          <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="manifest" href="/manifest.json" />

          // apple-touch icons
          <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
          <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />

          // opengraph meta tags
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://yourdomain.com" />
          <meta name="twitter:title" content="Next.js template with bash scripts" />
          <meta name="twitter:description" content="Best Next.js template with bash scripts in the world" />
          <meta name="twitter:image" content="https://yourdomain.com/icons/android-chrome-192x192.png" />
          <meta name="twitter:creator" content="@John_Doe" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Next.js template with bash scripts" />
          <meta property="og:description" content="Best Next.js template with bash scripts in the world" />
          <meta property="og:site_name" content="Next.js template with bash scripts" />
          <meta property="og:url" content="https://yourdomain.com" />
          <meta property="og:image" content="https://yourdomain.com/icons/apple-touch-icon.png" />

          // apple splash screen images
          <link rel="apple-touch-startup-image" href="/images/apple_splash_2048.png" sizes="2048x2732" />
          <link rel="apple-touch-startup-image" href="/images/apple_splash_1668.png" sizes="1668x2224" />
          <link rel="apple-touch-startup-image" href="/images/apple_splash_1536.png" sizes="1536x2048" />
          <link rel="apple-touch-startup-image" href="/images/apple_splash_1125.png" sizes="1125x2436" />
          <link rel="apple-touch-startup-image" href="/images/apple_splash_1242.png" sizes="1242x2208" />
          <link rel="apple-touch-startup-image" href="/images/apple_splash_750.png" sizes="750x1334" />
          <link rel="apple-touch-startup-image" href="/images/apple_splash_640.png" sizes="640x1136" />
        */}
      </Head>

      <body className="min-h-screen overflow-x-hidden bg-zinc-900 text-zinc-100">
        <ColorModeScript initialColorMode={theme.initialColorMode} />

        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
