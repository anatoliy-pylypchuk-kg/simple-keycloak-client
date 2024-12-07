"use server";

import { auth } from "@/auth";
import { closeAccount } from "@/utils/accountClient";
import { revalidatePath } from "next/cache";

export async function closeAccountAction(id: number) {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  await closeAccount(id);

  revalidatePath("/accounts");
}
