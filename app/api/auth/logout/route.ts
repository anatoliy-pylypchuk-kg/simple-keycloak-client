import { getToken } from "next-auth/jwt";

const logoutUrl = `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`;
const postLogoutUrl = `${process.env.BASE_URL}/api/auth/post-logout`;

export async function POST(req: Request){
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  return Response.redirect(
    `${logoutUrl}?post_logout_redirect_uri=${postLogoutUrl}&id_token_hint=${token?.idToken}`
  );
}
