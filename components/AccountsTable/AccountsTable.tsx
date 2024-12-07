"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Page } from "@/utils/client";
import { AccountModel } from "@/utils/accountClient";

import styles from "./AccountsTable.module.css";

export type AccountsTableProps = {
  accounts: Page<AccountModel>;
};

const columnHelper = createColumnHelper<AccountModel>();

const columns = [
  columnHelper.accessor("id", {
    header: () => "ID",
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("name", {
    header: () => "Name",
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("balance", {
    header: () => "Balance",
    footer: (props) => props.column.id,
  }),
];

export default function AccountsTable({
  accounts,
}: Readonly<AccountsTableProps>) {
  const [tableData, setTableData] = useState(accounts.content);
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: false,
  });

  return (
    <table cellSpacing={0} cellPadding={0} className={styles.table}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className={clsx(styles.cell, styles.headerCell)}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className={styles.cell}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
