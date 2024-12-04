import { auth } from "@/auth";
import Header from "@/components/Header";
import { getUserInfo } from "@/utils/userClient";

import styles from "./Home.module.css";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const userInfo = await getUserInfo();

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Hello {userInfo.firstName} {userInfo.lastName}!
        </h1>
        <dl className={styles.userInfo}>
          <div className={styles.userInfoItem}>
            <dt className={styles.userInfoTerm}>Username</dt>
            <dd className={styles.userInfoValue}>{userInfo.username}</dd>
          </div>

          <div className={styles.userInfoItem}>
            <dt className={styles.userInfoTerm}>Email</dt>
            <dd className={styles.userInfoValue}>{userInfo.email}</dd>
          </div>
        </dl>
      </main>
    </div>
  );
}
