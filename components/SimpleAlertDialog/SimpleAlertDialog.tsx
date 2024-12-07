import { ReactNode } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

import SimpleTooltip from "@/components/SimpleTooltip";

import styles from "./SimpleAlertDialog.module.css";

export type SimpleAlertDialogProps = {
  children: ReactNode;
  tooltipText: string;
  title: string;
  description: string;
  actionButtonText: string;
  cancelButtonText: string;
  onActionButtonClicked: () => void;
};

export default function SimpleAlertDialog({
  children,
  tooltipText,
  title,
  description,
  actionButtonText,
  cancelButtonText,
  onActionButtonClicked,
}: Readonly<SimpleAlertDialogProps>) {
  return (
    <AlertDialog.Root>
      <SimpleTooltip tooltipText={tooltipText}>
        <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      </SimpleTooltip>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.alertDialogOverlay} />

        <AlertDialog.Content className={styles.alertDialogContent}>
          <AlertDialog.Title className={styles.alertDialogTitle}>
            {title}
          </AlertDialog.Title>

          <AlertDialog.Description className={styles.alertDialogDescription}>
            {description}
          </AlertDialog.Description>

          <div className={styles.alertDialogActions}>
            <AlertDialog.Cancel asChild>
              <button className={styles.alertDialogCancelButton}>
                {cancelButtonText}
              </button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <button
                onClick={onActionButtonClicked}
                className={styles.alertDialogActionButton}
              >
                {actionButtonText}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
