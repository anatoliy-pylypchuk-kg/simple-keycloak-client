import { OpenAccountRequest } from "@/clients/accountClient";

import styles from "./OpenAccountForm.module.css";

export type OpenAccountFormProps = {
  onSubmitAction: (account: OpenAccountRequest) => void | Promise<void>;
  onClose: () => void;
};

export default function OpenAccountForm({
  onSubmitAction,
  onClose,
}: Readonly<OpenAccountFormProps>) {
  return (
    <form
      action={async (formData) => {
        await onSubmitAction({
          name: formData.get("name") as string,
          currency: formData.get("currency") as string,
        });
        onClose();
      }}
      className={styles.form}
    >
      <div className={styles.formData}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required={true} />
      </div>

      <div className={styles.formData}>
        <label htmlFor="currency">Currency</label>
        <input id="currency" name="currency" required={true} />
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.cancelButton} onClick={onClose}>
          Cancel
        </button>

        <button type="submit" className={styles.saveButton}>
          Save
        </button>
      </div>
    </form>
  );
}
