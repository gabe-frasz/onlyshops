import { destroyCookie, parseCookies } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";

import { api, getMagicInstance } from "@/libs";

type User = {
  id: string;
  name: string;
  avatarUrl?: string;
};

type AuthContextData = {
  user: User | null;
  setUser: (data: User | null) => void;
  isAuthenticated: boolean;
  loginWithGithub: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    async function run() {
      const { "onlyshops.token": token } = parseCookies();

      if (!token) return;

      const { data } = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser({
        id: data.sub,
        name: data.name,
        avatarUrl: data.avatarUrl,
      });
    }
    run();
  }, []);

  async function loginWithGithub() {
    const { "onlyshops.token": token } = parseCookies();

    if (token) return;

    await getMagicInstance().oauth.loginWithRedirect({
      provider: "github",
      redirectURI: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/auth/callback/github`,
    });
  }

  async function loginWithGoogle() {
    const { "onlyshops.token": token } = parseCookies();

    if (token) return;

    await getMagicInstance().oauth.loginWithRedirect({
      provider: "google",
      redirectURI: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/auth/callback/google`,
    });
  }

  function logout() {
    destroyCookie(undefined, "onlyshops.token");
    setUser(null);
  }

  const contextValue = {
    user,
    setUser,
    isAuthenticated,
    loginWithGithub,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
