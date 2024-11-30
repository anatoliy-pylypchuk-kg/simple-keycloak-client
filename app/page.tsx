import { signIn, signOut } from "@/auth";
import Hello from "@/components/hello";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.formWrapper}>
        <form
          action={async () => {
            "use server"
            await signIn("keycloak")
          }}
        >
          <button type="submit" className={styles.button}>Sign In with Keycloak</button>
        </form>
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <button type="submit" className={styles.button}>Sign Out</button>
        </form>
      </div>
      <Hello />
    </div>
  );
}
