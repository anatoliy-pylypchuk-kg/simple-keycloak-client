import { auth } from "@/auth";

import styles from "./Hello.module.css";

export default async function Hello() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <p className={styles.hello}>
      Hello {session.user.name}!
    </p>
  );
}
