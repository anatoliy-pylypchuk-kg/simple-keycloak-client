"use client";

import Link from "next/link";
import clsx from "clsx";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

import SimpleTooltip from "@/components/SimpleTooltip";
import SimpleAlertDialog from "@/components/SimpleAlertDialog";
import { Page } from "@/utils/client";
import { AccountModel } from "@/utils/accountClient";

import styles from "./AccountsTable.module.css";

export type AccountsTableProps = {
  accounts: Page<AccountModel>;
  closeAccountAction: (id: number) => Promise<void>;
};

export default function AccountsTable({
  accounts,
  closeAccountAction,
}: Readonly<AccountsTableProps>) {
  return (
    <>
      <table cellSpacing={0} cellPadding={0} className={styles.table}>
        <colgroup>
          <col span={1} />
          <col span={1} />
          <col span={1} />
          <col span={1} width="110px" />
        </colgroup>

        <thead>
          <tr>
            <th className={clsx(styles.cell, styles.headerCell)}>ID</th>
            <th className={clsx(styles.cell, styles.headerCell)}>Name</th>
            <th className={clsx(styles.cell, styles.headerCell)}>Balance</th>
            <th className={clsx(styles.cell, styles.headerCell)}></th>
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
              <td className={styles.cell}>
                <div className={styles.actions}>
                  <SimpleTooltip tooltipText="Edit account">
                    <button
                      className={clsx(styles.actionButton, styles.editButton)}
                      aria-label="Edit account"
                    >
                      <Pencil1Icon />
                    </button>
                  </SimpleTooltip>

                  <SimpleAlertDialog
                    tooltipText="Close account"
                    title="Close account"
                    description={`Are you sure you want to close ${account.name}?`}
                    actionButtonText="Close account"
                    cancelButtonText="Cancel"
                    onActionButtonClicked={() => closeAccountAction(account.id)}
                  >
                    <button
                      className={clsx(styles.actionButton, styles.closeButton)}
                      aria-label="Close account"
                    >
                      <TrashIcon />
                    </button>
                  </SimpleAlertDialog>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {accounts.page.totalPages > 1 && (
        <div className={styles.pagination}>
          {[...Array(accounts.page.totalPages).keys()].map((index) => (
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
      )}
    </>
  );
}
