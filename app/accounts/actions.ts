"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import {
  closeAccount,
  openAccount,
  OpenAccountRequest,
  updateAccount,
  UpdateAccountRequest,
} from "@/clients/accountClient";

export async function openAccountAction(request: OpenAccountRequest) {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  await openAccount(request);

  revalidatePath("/accounts");
}

export async function updateAccountAction(
  id: number,
  request: UpdateAccountRequest,
) {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  await updateAccount(id, request);

  revalidatePath("/accounts");
}

export async function closeAccountAction(id: number) {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  await closeAccount(id);

  revalidatePath("/accounts");
}
