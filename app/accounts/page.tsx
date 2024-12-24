import { redirect, RedirectType } from "next/navigation";

import { auth } from "@/auth";
import AccountsTable from "@/components/AccountsTable";
import Header from "@/components/Header";
import { getAccounts } from "@/clients/accountClient";

import { closeAccountAction, updateAccountAction } from "./actions";
import styles from "./page.module.css";

export type AccountsPageProps = {
  searchParams: Promise<{ page?: number; size?: number }>;
};

const defaultSize = 10;

export default async function AccountsPage({
  searchParams,
}: Readonly<AccountsPageProps>) {
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
    return redirect("/accounts", RedirectType.replace);
  }

  const accounts = await getAccounts(actualPage, actualSize);

  if (accounts.content.length === 0 && actualPage > 0) {
    return redirect(
      `/accounts?page=${accounts.page.totalPages}`,
      RedirectType.replace,
    );
  }

  return (
    <div className={styles.wrapper}>
      <Header />
      <header className={styles.header}>
        <h1 className={styles.title}>Accounts</h1>
      </header>
      <main className={styles.main}>
        <AccountsTable
          accounts={accounts}
          updateAccountAction={updateAccountAction}
          closeAccountAction={closeAccountAction}
        />
      </main>
    </div>
  );
}
