import { auth } from "@/auth";
import Landing from "@/components/Landing";
import Home from "@/components/Home";

import styles from "./page.module.css";

export default async function HomePage() {
  const session = await auth();
  const isAuthenticated = typeof session?.user !== "undefined";

  return (
    <div className={styles.mainWrapper}>
      {!isAuthenticated ? <Landing /> : <Home />}
    </div>
  );
}
