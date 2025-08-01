import type { ColumnDef } from "@tanstack/react-table";
import type { AccountTransactionModel } from "../models/account-transaction-model";

export const TransactionColumns = (
): ColumnDef<AccountTransactionModel>[] => [
  {
    accessorKey: "ownerName",
    header: "Cari Hesap Sahibi",
    cell: ({ row }) => (
        row.getValue("ownerName")
    ),
  },
  {
    accessorKey: "transactionDate",
    header: "Hareket Tarihi",
    cell: ({ row }) => {
      const dateValue = row.getValue("transactionDate");
      const date =
        dateValue instanceof Date ? dateValue : new Date(dateValue as string);
      return date.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
  },
  {
    accessorKey: "transactionType",
    header: "Hareket Türü",
    cell: ({ row }) => {
      const status = row.original.transactionType;
      console.log("Service Status:", status);
      return (
        <div className="capitalize">
          {status == 0
            ? "İşlem Ücreti"
            : status == 1
            ? "Receivable"
            : status == 2
            ? "Expense"
            : status == 3
            ? "Düzeltme"
            : null}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Açıklama",
    cell: ({ row }) => row.getValue("description"),
  },
  {
    accessorKey: "claim",
    header: "Alacak",
    cell: ({ row }) => (
      row.getValue("claim")
    ),
  },
  {
    accessorKey: "debt",
    header: "Borç",
    cell: ({ row }) => (
      row.getValue("debt")
    ),
  },
  {
    accessorKey: "balance",
    header: "Bakiye",
    cell: ({ row }) => row.getValue("balance"),
  },
];
