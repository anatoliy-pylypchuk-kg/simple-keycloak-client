import {
  DELETE,
  fetchFromResourceServer,
  Page,
  PATCH,
  POST,
} from "@/clients/client";

export type AccountModel = {
  id: number;
  name: string;
  currency: string;
  balance: number;
};

export type OpenAccountRequest = {
  name: string;
  currency: string;
};

export type UpdateAccountRequest = {
  name: string;
};

export async function getAccounts(page: number, size: number) {
  return await fetchFromResourceServer<Page<AccountModel>>(
    `/accounts?page=${page}&size=${size}`,
  );
}

export async function openAccount(request: OpenAccountRequest) {
  return await fetchFromResourceServer<AccountModel>(
    "/accounts",
    POST,
    request,
  );
}

export async function updateAccount(id: number, request: UpdateAccountRequest) {
  return await fetchFromResourceServer<AccountModel>(
    `/accounts/${id}`,
    PATCH,
    request,
  );
}

export async function closeAccount(id: number) {
  await fetchFromResourceServer(`/accounts/${id}`, DELETE);
}
