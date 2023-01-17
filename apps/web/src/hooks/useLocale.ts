import { useRouter } from "next/router";

export const useLocale = () => {
  const { locale } = useRouter();

  return {
    isInEnglish: locale === "en",
    isInPortuguese: locale === "pt",
  };
};
