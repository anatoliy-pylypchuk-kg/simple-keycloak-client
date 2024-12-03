import styles from "./SignOutButton.module.css";

export default function SignOutButton() {
  return (
    <form action="/api/auth/logout" method="POST">
      <button type="submit" className={styles.signOutButton}>
        Sign Out
      </button>
    </form>
  );
}
