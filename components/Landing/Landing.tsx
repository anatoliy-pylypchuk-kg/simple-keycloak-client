import SignInButton from "@/components/SignInButton";

import styles from "./Landing.module.css";

export default async function Landing() {
  return (
    <div className={styles.wrapper}>
      <header>
        <h1 className={styles.heading}>
          Welcome to the Simple Keycloak Client!
        </h1>
      </header>
      <main className={styles.main}>
        <div className={styles.mainContent}>
          <p className={styles.heroText}>
            Some motivating text which describes why this client is absolutely
            awesome and you should definitely use it
          </p>
          <div className={styles.signInWrapper}>
            <p className={styles.signInHint}>
              Already a user? Click the Sign In button!
            </p>
            <SignInButton />
            <p className={styles.signUpHint}>
              New user? Confusingly, still click the Sign In button!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
