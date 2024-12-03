import { auth } from "@/auth";

import styles from "./Home.module.css";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <form action="/api/auth/logout" method="POST">
      <button type="submit" className={styles.button}>
        Sign Out
      </button>
    </form>
  );
}
