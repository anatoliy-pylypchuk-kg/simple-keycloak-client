import { auth } from "@/auth";
import SignOutButton from "@/components/SignOutButton";

import styles from "./Header.module.css";
import HeaderLinks from "@/components/HeaderLinks";

export default async function Header() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <HeaderLinks />

      <div className={styles.userInfo}>
        <p className={styles.name}>{session.user.name}</p>
        <SignOutButton />
      </div>
    </div>
  );
}
