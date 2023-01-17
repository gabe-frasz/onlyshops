import { NextPage } from "next";
import Link from "next/link";

import { Head, PageTransition } from "@/components";
import { useLocale } from "@/hooks";

const Home: NextPage = () => {
  const { isInEnglish } = useLocale();

  return (
    <PageTransition>
      <Head title={isInEnglish ? "Home" : "Início"} />

      <Link href="/success">Ai toma dnv</Link>
    </PageTransition>
  );
};

export default Home;
