import { OpenCardRequest } from "@/clients/cardClient";

import styles from "./OpenCardForm.module.css";

export type OpenCardFormProps = {
  onSubmitAction: (card: OpenCardRequest) => void | Promise<void>;
  onClose: () => void;
};

export default function OpenCardForm({
  onSubmitAction,
  onClose,
}: Readonly<OpenCardFormProps>) {
  return (
    <form
      action={async (formData) => {
        await onSubmitAction({
          accountId: Number(formData.get("accountId") as string),
          nameOnCard: formData.get("nameOnCard") as string,
        });
        onClose();
      }}
      className={styles.form}
    >
      <div className={styles.formData}>
        <label htmlFor="accountId">Account ID</label>
        <input id="accountId" name="accountId" required={true} />
      </div>

      <div className={styles.formData}>
        <label htmlFor="nameOnCard">Name on card</label>
        <input id="nameOnCard" name="nameOnCard" required={true} />
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
