import { NextPage } from "next";
import { GithubLogo, GoogleLogo } from "phosphor-react";

import { Head, Logo, PageTransition } from "@/components";
import { useAuth, useLocale } from "@/hooks";

const LoginPage: NextPage = () => {
  const { loginWithGithub, loginWithGoogle } = useAuth();
  const { isInEnglish } = useLocale();

  return (
    <PageTransition>
      <Head title="Login" />

      <main className="flex h-[calc(100vh-95px)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-md flex-col items-center">
          <Logo variant="text" />

          <h2 className="mt-6 mb-16 text-center text-3xl font-bold tracking-tight">
            Sign in to your account
          </h2>

          <div className="flex flex-col items-center justify-between gap-4">
            <button
              onClick={() => loginWithGithub()}
              className="flex items-center gap-2 rounded bg-gray-800 px-3 py-2 text-lg font-semibold text-white"
            >
              <GithubLogo size={28} weight="bold" />
              {isInEnglish ? "Enter with GitHub" : "Entrar com GitHub"}
            </button>

            <button
              onClick={() => loginWithGoogle()}
              className="flex items-center gap-2 rounded border border-black bg-white px-3 py-2 text-lg font-semibold text-black"
            >
              <GoogleLogo size={28} weight="bold" />
              {isInEnglish ? "Enter with Google" : "Entrar com Google"}
            </button>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default LoginPage;
