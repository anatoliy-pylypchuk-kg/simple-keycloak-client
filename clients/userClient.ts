import { fetchFromResourceServer } from "@/clients/client";

export type UserInfoModel = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type UserAccessResource = "ACCOUNTS" | "CARDS";

export type UserAccessModel = {
  allowedResources: UserAccessResource[];
};

export async function getUserInfo() {
  return await fetchFromResourceServer<UserInfoModel>("/users/me");
}

export async function getUserAccess() {
  return await fetchFromResourceServer<UserAccessModel>("/users/access");
}
