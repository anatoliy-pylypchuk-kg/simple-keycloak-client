import { redirect } from "next/navigation";

import { auth } from "@/auth";
import AccountsTable from "@/components/AccountsTable";
import Header from "@/components/Header";
import { getAccounts } from "@/utils/accountClient";

import styles from "./page.module.css";

export default async function AccountsPage() {
  const session = await auth();

  if (!session?.user) {
    return redirect("/");
  }

  const accounts = await getAccounts(0, 20);

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
