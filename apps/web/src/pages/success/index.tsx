import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import Link from "next/link";
import { destroyCookie } from "nookies";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { Head, PageTransition } from "@/components";
import { useLocale } from "@/hooks";

const SuccessPage: NextPage = () => {
  const { isInEnglish } = useLocale();

  useEffect(() => {
    toast.success(
      isInEnglish
        ? "Your payment was successful!"
        : "Seu pagamento foi realizado com sucesso!"
    );
  }, [isInEnglish]);

  return (
    <PageTransition>
      <Head title={isInEnglish ? "Thank you!" : "Obrigado!"} />

      <main className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 transition hover:ring-gray-900/20 dark:text-gray-300 dark:ring-gray-100/10 dark:hover:ring-gray-100/20">
              {isInEnglish
                ? "Announcing our next gen of products. "
                : "Anunciando a nossa nova geração de produtos. "}
              <Link
                href="/"
                className="font-semibold text-violet-600 dark:text-violet-300"
              >
                <span className="absolute inset-0" aria-hidden="true" />
                {isInEnglish ? "See more" : "Ver mais"}{" "}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl sm:leading-normal">
              {isInEnglish
                ? "Thank you for getting this far 💜"
                : "Obrigado por ter chegado até aqui 💜"}
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              {isInEnglish
                ? "Your payment has been approved! Now you were supposed to get a confirmation email in your inbox, but the developer couldn't set it up until the website launched O.O (so you won't get it)."
                : "Seu pagamento foi aprovado! Agora você deveria receber um email de confirmação, mas o desenvolvedor não conseguiu configurar isso até o lançamento do site O.O (então você não vai receber)."}
            </p>

            <p className="mt-2 text-lg leading-8 text-gray-600">
              {isInEnglish
                ? "It's better not to wait for anything to arrive at your house because none of the products you just bought are real. ;)"
                : "Ah é! É melhor você não esperar nada chegar na sua casa, porque nenhum dos produtos que você acabou de comprar se quer existem. ;)"}
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/"
                className="max-w-[300px] rounded-md bg-violet-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-violet-50 shadow-sm transition-colors hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
              >
                {isInEnglish
                  ? "Go buy something that you don't need but you want to"
                  : "Vá comprar aquilo que você quer mas não precisa"}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-42rem)]">
          <svg
            className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </main>
    </PageTransition>
  );
};

export default SuccessPage;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { stripe_redirect } = ctx.query;

  if (!!stripe_redirect) {
    destroyCookie(ctx, "onlyshops.cart");

    return {
      props: {},
    };
  }

  return {
    props: {},
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};
