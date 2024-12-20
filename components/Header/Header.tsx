import { auth } from "@/auth";
import SignOutButton from "@/components/SignOutButton";

import styles from "./Header.module.css";
import HeaderLinks from "@/components/HeaderLinks";
import {
  getUserAccess,
  UserAccessModel,
  UserAccessResource,
} from "@/utils/userClient";

function hasAccess(userAccess: UserAccessModel, resource: UserAccessResource) {
  return !!userAccess?.allowedResources?.find((r) => r === resource);
}

export default async function Header() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const userAccess = await getUserAccess();
  const hasAccountsAccess = hasAccess(userAccess, "ACCOUNTS");
  const hasCardsAccess = hasAccess(userAccess, "CARDS");

  return (
    <div className={styles.wrapper}>
      <HeaderLinks
        hasAccountsAccess={hasAccountsAccess}
        hasCardsAccess={hasCardsAccess}
      />

      <div className={styles.userInfo}>
        <p className={styles.name}>{session.user.name}</p>
        <SignOutButton />
      </div>
    </div>
  );
}
