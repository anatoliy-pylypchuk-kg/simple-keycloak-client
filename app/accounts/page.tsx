import { redirect } from "next/navigation";

import { auth } from "@/auth";
import AccountsTable from "@/components/AccountsTable";
import Header from "@/components/Header";
import { getAccounts } from "@/utils/accountClient";

import styles from "./page.module.css";

export type AccountsPageProps = {
  searchParams: Promise<{ page?: number; size?: number }>;
};

export default async function AccountsPage({
  searchParams,
}: Readonly<AccountsPageProps>) {
  const session = await auth();

  if (!session?.user) {
    return redirect("/");
  }

  const { page, size } = await searchParams;
  const accounts = await getAccounts((page ?? 1) - 1, size ?? 10);

  return (
    <div className={styles.wrapper}>
      <Header />
      <header className={styles.header}>
        <h1 className={styles.title}>Accounts</h1>
      </header>
      <main className={styles.main}>
        <AccountsTable accounts={accounts} />
      </main>
    </div>
  );
}
