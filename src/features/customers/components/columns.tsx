import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import type { CustomerModel } from "../models/CustomerModel";

import type { Column } from "@tanstack/react-table";
import { EditCustomerDrawer } from "./edit-drawer";
import { IconCar, IconReportMoney, IconRowRemove } from "@tabler/icons-react";
import { toast } from "react-toastify";
import type { GenericService } from "@/core/services/GenericService";

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

export const columns = (service: GenericService<CustomerModel>, onCustomerUpdated?: () => Promise<void>): ColumnDef<CustomerModel>[] => [
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
      row.getValue("address")
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
        <div className="flex items-center gap-6">
        <EditCustomerDrawer
          customer={customer}
          onCustomerUpdated={onCustomerUpdated}
        >
        </EditCustomerDrawer>
        <IconRowRemove onClick={async () => {
          const response = await service.remove(customer.id);
          console.log("Kayıt silme yanıtı:", response);
          if (response.succeeded) {
            toast.success("Kayıt silindi!");
            if (onCustomerUpdated) {
              await onCustomerUpdated();
            }
          } else {
            toast.error(response.errors?.[0] || "Kayıt silinirken bir hata oluştu!");
          }
        }}></IconRowRemove>
        <IconCar></IconCar>
        <IconReportMoney></IconReportMoney>
        </div>
      );
    },
  },
];
