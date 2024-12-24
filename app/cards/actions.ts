"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { closeCard, openCard, OpenCardRequest } from "@/clients/cardClient";

export async function openCardAction(request: OpenCardRequest) {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  await openCard(request);

  revalidatePath("/cards");
}

export async function closeCardAction(id: number) {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  await closeCard(id);

  revalidatePath("/cards");
}
