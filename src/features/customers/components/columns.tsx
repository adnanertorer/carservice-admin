import type { ColumnDef } from "@tanstack/react-table";
import type { CustomerModel } from "../models/CustomerModel";

import { EditCustomerDrawer } from "./edit-drawer";
import { IconCar, IconReportMoney, IconRowRemove } from "@tabler/icons-react";
import { sortableHeader } from "@/components/sortable-header";
import type { NavigateFunction } from "react-router-dom";

export const columns = (
  onCustomerUpdated?: () => Promise<void>,
  navigate?: NavigateFunction,
  onDeleteRequest?: (item: CustomerModel) => void
): ColumnDef<CustomerModel>[] => [
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
    accessorKey: "city.name",
    header: ({ column }) => sortableHeader("Şehir", column),
    cell: ({ row }) => {
      return <div className="capitalize">{row.original.city?.name}</div>;
    },
  },
  {
    accessorKey: "district.name",
    header: ({ column }) => sortableHeader("İlçe", column),
    cell: ({ row }) => (
      <div className="capitalize">{row.original.district?.name}</div>
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
          ></EditCustomerDrawer>
          <IconRowRemove
            onClick={() => onDeleteRequest?.(customer)}
          ></IconRowRemove>
          <IconCar
            onClick={() => {
              if (navigate) {
                navigate(`/customers/${customer.id}/vehicles`);
              }
            }}
          ></IconCar>
          <IconReportMoney></IconReportMoney>
        </div>
      );
    },
  },
];
