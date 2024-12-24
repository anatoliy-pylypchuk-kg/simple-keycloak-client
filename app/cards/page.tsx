import { redirect, RedirectType } from "next/navigation";

import { auth } from "@/auth";
import { getCards } from "@/clients/cardClient";
import CardsGrid from "@/components/CardsGrid";
import Header from "@/components/Header";
import OpenCardButton from "@/components/OpenCardButton";

import { closeCardAction, openCardAction } from "./actions";

import styles from "./page.module.css";

export type CardsPageProps = {
  searchParams: Promise<{ page?: number; size?: number }>;
};

const defaultSize = 10;

export default async function CardsPage({
  searchParams,
}: Readonly<CardsPageProps>) {
  const session = await auth();

  if (!session?.user) {
    return redirect("/");
  }

  const { page, size } = await searchParams;
  const actualPage = (page ?? 1) - 1;
  const actualSize = size ?? defaultSize;

  if (
    actualPage < 0 ||
    actualSize < 1 ||
    (actualPage === 0 && size === defaultSize)
  ) {
    return redirect("/cards", RedirectType.replace);
  }

  const cards = await getCards(actualPage, actualSize);

  if (cards.content.length === 0 && actualPage > 0) {
    return redirect(
      `/cards?page=${cards.page.totalPages}`,
      RedirectType.replace,
    );
  }

  return (
    <div className={styles.wrapper}>
      <Header />
      <header className={styles.header}>
        <h1 className={styles.title}>Cards</h1>
        <OpenCardButton onSubmitAction={openCardAction} />
      </header>

      <main className={styles.main}>
        <CardsGrid cards={cards} closeCardAction={closeCardAction} />
      </main>
    </div>
  );
}
