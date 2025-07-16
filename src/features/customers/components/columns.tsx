import type { ColumnDef } from "@tanstack/react-table";
import type { CustomerModel } from "../models/CustomerModel";

import { EditCustomerDrawer } from "./edit-drawer";
import { IconCar, IconReportMoney, IconRowRemove } from "@tabler/icons-react";
import { toast } from "react-toastify";
import type { GenericService } from "@/core/services/GenericService";
import { sortableHeader } from "@/components/sortable-header";
import type { NavigateFunction } from "react-router-dom";

export const columns = (
  service: GenericService<CustomerModel>,
   onCustomerUpdated?: () => Promise<void>,
  navigate?: NavigateFunction): ColumnDef<CustomerModel>[] => [
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
        <IconCar onClick={() => {
          if (navigate) {
            navigate(`/customers/${customer.id}/vehicles`);
          }
        }}></IconCar>
        <IconReportMoney></IconReportMoney>
        </div>
      );
    },
  },
];
