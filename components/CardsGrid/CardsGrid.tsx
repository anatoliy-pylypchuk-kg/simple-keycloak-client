"use client";

import { Space_Mono } from "next/font/google";
import Link from "next/link";
import clsx from "clsx";
import { TrashIcon } from "@radix-ui/react-icons";

import { Page } from "@/clients/client";
import { CardModel } from "@/clients/cardClient";
import SimpleAlertDialog from "@/components/SimpleAlertDialog";

import styles from "./CardsGrid.module.css";

export type CardsGridProps = {
  cards: Page<CardModel>;
  closeCardAction: (id: number) => Promise<void>;
};

const spaceMono = Space_Mono({ weight: "400", subsets: ["latin"] });

function cardNumber(num: string) {
  return `${num.substring(0, 4)} ${num.substring(4, 8)} ${num.substring(8, 12)} ${num.substring(12, 16)}`;
}

function expiryDate(date: string) {
  const expiryDate = new Date(date);
  const month = expiryDate.getMonth() + 1;
  return `${month < 10 ? "0" : ""}${month} / ${expiryDate.getFullYear()}`;
}

function randomDesign() {
  return Math.floor(Math.random() * 5).toString();
}

export default function CardsGrid({
  cards,
  closeCardAction,
}: Readonly<CardsGridProps>) {
  return (
    <>
      <div className={styles.grid}>
        {cards.content.map((card) => (
          <div key={card.id} className={styles.cardWrapper}>
            <div
              className={clsx(styles.card, spaceMono.className)}
              data-design={randomDesign()}
              suppressHydrationWarning // Because of the random designs
            >
              <p>{cardNumber(card.cardNumber)}</p>
              <p className={styles.expiryDate}>{expiryDate(card.expiryDate)}</p>
              <div className={styles.nameAndActions}>
                <p>{card.nameOnCard}</p>
                <SimpleAlertDialog
                  tooltipText="Close card"
                  title="Close Card"
                  description={`Do you want to close card ${cardNumber(card.cardNumber)}?`}
                  actionButtonText="Close card"
                  cancelButtonText="Cancel"
                  onActionButtonClicked={() => closeCardAction(card.id)}
                >
                  <button className={styles.closeCardButton}>
                    <TrashIcon width={20} height={20} />
                  </button>
                </SimpleAlertDialog>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cards.page.totalPages > 1 && (
        <div className={styles.pagination}>
          {[...Array(cards.page.totalPages).keys()].map((index) => (
            <Link
              key={index}
              href={`/cards?page=${index + 1}`}
              className={clsx(
                styles.pageButton,
                cards.page.number === index && styles.activePageButton,
              )}
            >
              {index + 1}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
