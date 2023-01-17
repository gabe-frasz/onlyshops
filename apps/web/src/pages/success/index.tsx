import type { NextPage } from "next";
import Link from "next/link";

import { Head, PageTransition } from "@/components";
import { useLocale } from "@/hooks";

const SuccessPage: NextPage = () => {
  const { isInEnglish } = useLocale();

  return (
    <PageTransition>
      <Head title={isInEnglish ? "Thank you!" : "Obrigado!"} />

      <Link href="/">{isInEnglish ? "Receive dad receive" : "Ai tomaaa"}</Link>
    </PageTransition>
  );
};

export default SuccessPage;
