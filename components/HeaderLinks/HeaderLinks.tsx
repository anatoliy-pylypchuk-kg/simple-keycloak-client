"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import styles from "./HeaderLinks.module.css";

export default function HeaderLinks() {
  const pathname = usePathname();

  const home = "/";
  const accounts = "/accounts";
  const cards = "/cards";

  return (
    <ul className={styles.links}>
      <li>
        <Link
          href={home}
          className={clsx(styles.link, pathname === home && styles.active)}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href={accounts}
          className={clsx(styles.link, pathname === accounts && styles.active)}
        >
          Accounts
        </Link>
      </li>
      <li>
        <Link
          href={cards}
          className={clsx(styles.link, pathname === cards && styles.active)}
        >
          Cards
        </Link>
      </li>
    </ul>
  );
}
