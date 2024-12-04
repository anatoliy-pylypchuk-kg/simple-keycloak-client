import { DELETE, fetchFromResourceServer, Page, POST } from "@/utils/client";

export type CardModel = {
  id: number;
  nameOnCard: string;
  cardNumber: string;
  expiryDate: string;
};

export type OpenCardRequest = {
  accountId: number;
  nameOnCard: string;
};

export async function getCards(page: number, size: number) {
  return await fetchFromResourceServer<Page<CardModel>>(
    `/cards?page=${page}&size=${size}`,
  );
}

export async function openCard(request: OpenCardRequest) {
  return await fetchFromResourceServer<CardModel>("/accounts", POST, request);
}

export async function closeCard(id: number) {
  await fetchFromResourceServer(`/cards/${id}`, DELETE);
}
