import { auth } from "@/auth";
import SignOutButton from "@/components/SignOutButton";

import { getUserAccess, hasAccess } from "@/clients/userClient";
import HeaderLinks from "@/components/HeaderLinks";

import styles from "./Header.module.css";

export default async function Header() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const userAccess = await getUserAccess();
  const hasAccountsAccess = hasAccess(userAccess, "ACCOUNTS");
  const hasCardsAccess = hasAccess(userAccess, "CARDS");

  return (
    <div className={styles.wrapper}>
      <HeaderLinks
        hasAccountsAccess={hasAccountsAccess}
        hasCardsAccess={hasCardsAccess}
      />

      <div className={styles.userInfo}>
        <p className={styles.name}>{session.user.name}</p>
        <SignOutButton />
      </div>
    </div>
  );
}
