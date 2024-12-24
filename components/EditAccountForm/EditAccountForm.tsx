import { UpdateAccountRequest } from "@/clients/accountClient";

import styles from "./EditAccountForm.module.css";

export type EditAccountFormProps = {
  initialName: string;
  onSubmitAction: (account: UpdateAccountRequest) => void | Promise<void>;
  onClose: () => void;
};

export default function EditAccountForm({
  initialName,
  onSubmitAction,
  onClose,
}: Readonly<EditAccountFormProps>) {
  return (
    <form
      action={async (formData) => {
        await onSubmitAction({ name: formData.get("name") as string });
        onClose();
      }}
      className={styles.form}
    >
      <div className={styles.formData}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          defaultValue={initialName}
          required={true}
        />
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
