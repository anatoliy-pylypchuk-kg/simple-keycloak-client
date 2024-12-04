import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Keycloak],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      // @ts-expect-error Sessions should contain an access token, but TypeScript doesn't know that
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
