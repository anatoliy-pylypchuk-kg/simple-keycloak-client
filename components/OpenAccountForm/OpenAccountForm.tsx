import { OpenAccountRequest } from "@/clients/accountClient";

import styles from "./OpenAccountForm.module.css";

export type OpenAccountFormProps = {
  onSubmit: (account: OpenAccountRequest) => void;
};

export default function OpenAccountForm({
  onSubmit,
}: Readonly<OpenAccountFormProps>) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name: "test", currency: "USD" });
      }}
    ></form>
  );
}
