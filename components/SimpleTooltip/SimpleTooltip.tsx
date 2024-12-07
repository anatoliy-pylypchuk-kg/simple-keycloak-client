import { ReactNode } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

import styles from "./SimpleTooltip.module.css";

export type SimpleTooltipProps = {
  children: ReactNode;
  tooltipText: string;
  align?: "center" | "start" | "end";
};

export default function SimpleTooltip({
  children,
  tooltipText,
  align = "center",
}: Readonly<SimpleTooltipProps>) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content align={align} className={styles.tooltipContent}>
          {tooltipText}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
