import { auth } from "@/auth";
import Header from "@/components/Header";

import styles from "./Home.module.css";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Hello {session.user.name}!</h1>
      </main>
    </div>
  );
}
