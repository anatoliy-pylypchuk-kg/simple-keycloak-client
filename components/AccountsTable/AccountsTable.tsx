"use client";

import clsx from "clsx";

import { Page } from "@/utils/client";
import { AccountModel } from "@/utils/accountClient";

import styles from "./AccountsTable.module.css";
import Link from "next/link";

export type AccountsTableProps = {
  accounts: Page<AccountModel>;
};

export default function AccountsTable({
  accounts,
}: Readonly<AccountsTableProps>) {
  return (
    <>
      <table cellSpacing={0} cellPadding={0} className={styles.table}>
        <thead>
          <tr>
            <th className={clsx(styles.cell, styles.headerCell)}>ID</th>
            <th className={clsx(styles.cell, styles.headerCell)}>Name</th>
            <th className={clsx(styles.cell, styles.headerCell)}>Balance</th>
          </tr>
        </thead>
        <tbody>
          {accounts.content.map((account) => (
            <tr key={account.id}>
              <td className={styles.cell}>{account.id}</td>
              <td className={styles.cell}>{account.name}</td>
              <td className={styles.cell}>
                {Intl.NumberFormat("en", {
                  currency: account.currency,
                  style: "currency",
                }).format(account.balance)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.paginationWrapper}>
        {Array(accounts.page.totalPages)
          .keys()
          .map((index) => (
            <Link
              key={index}
              href={`/accounts?page=${index + 1}`}
              className={clsx(
                styles.pageButton,
                accounts.page.number === index && styles.activePageButton,
              )}
            >
              {index + 1}
            </Link>
          ))}
      </div>
    </>
  );
}
