import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import type { CustomerModel } from "../models/CustomerModel";

import type { Column } from "@tanstack/react-table";
import { EditCustomerDrawer } from "./edit-drawer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sortableHeader = (label: string, column: Column<any, unknown>) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {label}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);

export const columns = (onCustomerUpdated?: () => Promise<void>): ColumnDef<CustomerModel>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Adı",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "surname",
    header: ({ column }) => sortableHeader("Soyadı", column),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("surname")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => sortableHeader("E-Posta", column),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => sortableHeader("Telefon", column),
    cell: ({ row }) => <div className="lowercase">{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "address",
    header: ({ column }) => sortableHeader("Adres", column),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("address")}</div>
    ),
  },
  {
    accessorKey: "taxOffice",
    header: ({ column }) => sortableHeader("Vergi Dairesi", column),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("taxOffice")}</div>
    ),
  },
  {
    accessorKey: "taxNumber",
    header: ({ column }) => sortableHeader("Vergi Numarası", column),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("taxNumber")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <EditCustomerDrawer
          customer={customer}
          onCustomerUpdated={onCustomerUpdated}
        >
        </EditCustomerDrawer>
      );
    },
  },
];
