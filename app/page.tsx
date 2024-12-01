import { auth, signIn } from "@/auth";
import Hello from "@/components/hello";

import styles from "./page.module.css";

export default async function Home() {
  const session = await auth();
  const isAuthenticated = typeof session?.user !== "undefined";

  return (
    <div className={styles.mainWrapper}>
      {!isAuthenticated ? (
        <form
          action={async () => {
            "use server";
            await signIn("keycloak");
          }}
        >
          <button type="submit" className={styles.button}>
            Sign In
          </button>
        </form>
      ) : (
        <>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className={styles.button}>
              Sign Out
            </button>
          </form>
          <Hello />
        </>
      )}
    </div>
  );
}
