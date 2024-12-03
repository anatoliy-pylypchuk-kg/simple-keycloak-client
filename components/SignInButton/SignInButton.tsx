import { signIn } from "@/auth";

import styles from "./SignInButton.module.css";

export default async function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("keycloak");
      }}
    >
      <button type="submit" className={styles.signInButton}>
        Sign In
      </button>
    </form>
  );
}
