import { auth } from "@/auth";

export type PageInfo = {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
};

export type Page<T> = {
  content: T[];
  page: PageInfo;
};

export const resourceServerBaseUrl = process.env.RESOURCE_SERVER_BASE_URL;

export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const PATCH = "PATCH";
export const DELETE = "DELETE";

export async function getAccessToken() {
  const session = await auth();
  // @ts-expect-error Sessions contain an access token, but TypeScript doesn't know that
  return session?.accessToken as string;
}

export async function fetchFromResourceServer<T>(
  path: string,
  method = GET,
  body?: unknown,
): Promise<T> {
  const accessToken = await getAccessToken();
  return await fetch(`${resourceServerBaseUrl}${path}`, {
    method,
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(body),
  }).then((response) => {
    console.log(response);
    return response.json();
  });
}
