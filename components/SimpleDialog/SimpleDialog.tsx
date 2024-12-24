import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import SimpleTooltip from "@/components/SimpleTooltip";

import styles from "./SimpleDialog.module.css";
import { Cross2Icon } from "@radix-ui/react-icons";

export type SimpleAlertDialogProps = {
  children: ReactNode;
  tooltipText: string;
  title: string;
  description?: string;
  content: ReactNode;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function SimpleDialog({
  children,
  tooltipText,
  title,
  description,
  content,
  open,
  setOpen,
}: Readonly<SimpleAlertDialogProps>) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <SimpleTooltip tooltipText={tooltipText}>
        <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      </SimpleTooltip>

      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />

        <Dialog.Content className={styles.dialogContent}>
          <Dialog.Title className={styles.dialogTitle}>{title}</Dialog.Title>

          {description && (
            <Dialog.Description className={styles.dialogDescription}>
              {description}
            </Dialog.Description>
          )}

          {content}

          <Dialog.Close asChild>
            <button className={styles.closeIconButton} aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
