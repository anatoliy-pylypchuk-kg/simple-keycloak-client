"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

import { Page } from "@/clients/client";
import { AccountModel, UpdateAccountRequest } from "@/clients/accountClient";
import EditAccountForm from "@/components/EditAccountForm";
import SimpleAlertDialog from "@/components/SimpleAlertDialog";
import SimpleDialog from "@/components/SimpleDialog";

import styles from "./AccountsTable.module.css";

export type AccountsTableProps = {
  accounts: Page<AccountModel>;
  updateAccountAction: (
    id: number,
    request: UpdateAccountRequest,
  ) => Promise<void>;
  closeAccountAction: (id: number) => Promise<void>;
};

export default function AccountsTable({
  accounts,
  updateAccountAction,
  closeAccountAction,
}: Readonly<AccountsTableProps>) {
  const [dialogsOpen, setDialogsOpen] = useState(
    new Map(accounts.content.map((a) => [a.id, false])),
  );

  function setDialogOpen(accountId: number, value: boolean) {
    setDialogsOpen(
      new Map(
        dialogsOpen
          .entries()
          .map(([id, v]) => [id, id === accountId ? value : v]),
      ),
    );
  }

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
                  <SimpleDialog
                    tooltipText="Edit account"
                    title={`Edit ${account.name}`}
                    open={dialogsOpen.get(account.id) ?? false}
                    setOpen={(open) => setDialogOpen(account.id, open)}
                    content={
                      <EditAccountForm
                        initialName={account.name}
                        onSubmitAction={async (request) =>
                          updateAccountAction(account.id, request)
                        }
                        onClose={() => setDialogOpen(account.id, false)}
                      />
                    }
                  >
                    <button
                      className={clsx(styles.actionButton, styles.editButton)}
                      aria-label="Edit account"
                    >
                      <Pencil1Icon />
                    </button>
                  </SimpleDialog>

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
