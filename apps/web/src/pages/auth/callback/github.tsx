import { NextPage } from "next";
import Router from "next/router";
import { setCookie } from "nookies";
import { useEffect } from "react";

import { useAuth, useLocale } from "@/hooks";
import { api, getMagicInstance } from "@/libs";
import { Spinner } from "phosphor-react";

const CallbackPage: NextPage = () => {
  const { setUser } = useAuth();
  const {isInEnglish} = useLocale();

  useEffect(() => {
    async function run() {
      const { oauth } = await getMagicInstance().oauth.getRedirectResult();

      const { data } = await api.post<{ token: string }>("/users", {
        name: oauth.userInfo.name,
        email: oauth.userInfo.email,
        avatarUrl: oauth.userInfo.picture,
      });

      setCookie(undefined, "onlyshops.token", data.token, {
        path: "/",
      });

      const { data: userData } = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      setUser({
        id: userData.sub,
        name: userData.name,
        avatarUrl: userData?.avatarUrl,
      });

      Router.push("/");
    }
    run();
  }, [setUser]);

  return (
    <div className="flex h-[calc(100vh-85px)] w-full flex-col items-center justify-center gap-2">
      <Spinner
        size={64}
        weight="bold"
        className="animate-spin text-violet-500"
      />

      <h2 className="text-2xl font-semibold">{isInEnglish ? "Loggin user" : "Logando usuário"}</h2>
    </div>
  );
};

export default CallbackPage;
