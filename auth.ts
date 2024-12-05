import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import { JWT } from "@auth/core/jwt";
import { TokenEndpointResponse } from "oauth4webapi";

type OidcConfiguration = {
  token_endpoint: string;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Keycloak],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;

        return token;
      } else if (
        typeof token.expiresAt === "number" &&
        Date.now() < token.expiresAt * 1000
      ) {
        return token;
      } else {
        return await refreshToken(token);
      }
    },
    async session({ session, token }) {
      // @ts-expect-error Sessions should contain an access token, but TypeScript doesn't know that
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

async function refreshToken(token: JWT) {
  const config: OidcConfiguration = await fetch(
    `${process.env.AUTH_KEYCLOAK_ISSUER}/.well-known/openid-configuration`,
  ).then((response) => response.json());

  const response: TokenEndpointResponse = await fetch(config.token_endpoint, {
    method: "POST",
    body: new URLSearchParams({
      client_id: process.env.AUTH_KEYCLOAK_ID!,
      client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken as string,
    }),
  }).then((response) => response.json());

  token.accessToken = response.access_token;
  token.expiresAt = Math.floor(Date.now() / 1000 + (response.expires_in ?? 0));

  if (response.refresh_token) {
    token.refreshToken = response.refresh_token;
  }

  return token;
}
