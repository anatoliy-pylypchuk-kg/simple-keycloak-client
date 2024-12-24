"use client";

import { useState } from "react";

import { OpenAccountRequest } from "@/clients/accountClient";
import OpenAccountForm from "@/components/OpenAccountForm";
import SimpleDialog from "@/components/SimpleDialog";

import styles from "./OpenAccountButton.module.css";

export type OpenAccountButtonProps = {
  onSubmitAction: (request: OpenAccountRequest) => void | Promise<void>;
};

export default function OpenAccountButton({
  onSubmitAction,
}: Readonly<OpenAccountButtonProps>) {
  const [open, setOpen] = useState(false);

  return (
    <SimpleDialog
      title={"Open Account"}
      content={
        <OpenAccountForm
          onSubmitAction={onSubmitAction}
          onClose={() => setOpen(false)}
        />
      }
      open={open}
      setOpen={setOpen}
    >
      <button className={styles.openAccountButton}>Open account</button>
    </SimpleDialog>
  );
}
