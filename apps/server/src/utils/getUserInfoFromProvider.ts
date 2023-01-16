import { OAuth2Provider } from "@/@types";
import axios from "axios";
import { githubUserInfoResponseSchema } from "zod-schemas";

export async function getUserInfoFromProvider(
  provider: OAuth2Provider,
  access_token: string
) {
  switch (provider) {
    case "github":
      return await getUserInfoFromGitHub(access_token);
  }
}

async function getUserInfoFromGitHub(access_token: string) {
  const { data } = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const parsedUserInfo = githubUserInfoResponseSchema.safeParse(data);
  if (!parsedUserInfo.success) return null;
  const { id, name, email, avatar_url } = parsedUserInfo.data;

  return { id, name, email, avatarUrl: avatar_url ?? null };
}
