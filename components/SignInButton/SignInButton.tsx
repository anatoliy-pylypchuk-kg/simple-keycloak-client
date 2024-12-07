import { signIn } from "@/auth";

import styles from "./SignInButton.module.css";

export default function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("keycloak");
      }}
    >
      <button type="submit" className={styles.signInButton}>
        Sign In | Sign Up
      </button>
    </form>
  );
}
