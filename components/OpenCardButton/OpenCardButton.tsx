"use client";

import { useState } from "react";

import { OpenCardRequest } from "@/clients/cardClient";
import OpenCardForm from "@/components/OpenCardForm";
import SimpleDialog from "@/components/SimpleDialog";

import styles from "./OpenCardButton.module.css";

export type OpenCardButtonProps = {
  onSubmitAction: (request: OpenCardRequest) => void | Promise<void>;
};

export default function OpenCardButton({
  onSubmitAction,
}: Readonly<OpenCardButtonProps>) {
  const [open, setOpen] = useState(false);

  return (
    <SimpleDialog
      title={"Open Card"}
      content={
        <OpenCardForm
          onSubmitAction={onSubmitAction}
          onClose={() => setOpen(false)}
        />
      }
      open={open}
      setOpen={setOpen}
    >
      <button className={styles.openCardButton}>Open card</button>
    </SimpleDialog>
  );
}
