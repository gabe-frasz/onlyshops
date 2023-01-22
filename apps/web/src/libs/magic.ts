import { OAuthExtension } from "@magic-ext/oauth";
import { Magic } from "magic-sdk";

export const getMagicInstance = () => {
  return new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY!, {
    extensions: [new OAuthExtension()],
    testMode: process.env.NODE_ENV === "development",
  });
};
