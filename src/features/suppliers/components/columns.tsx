import type { ColumnDef } from "@tanstack/react-table";
import { IconRowRemove } from "@tabler/icons-react";
import { toast } from "react-toastify";
import type { GenericService } from "@/core/services/GenericService";
import { sortableHeader } from "@/components/sortable-header";
import type { SupplierModel } from "../models/supplier-model";
import { EditSupplierDrawer } from "./edit-drawer";

export const columns = (
  service: GenericService<SupplierModel>,
  onSupplierUpdated?: () => Promise<void>): ColumnDef<SupplierModel>[] => [
  {
    accessorKey: "name",
    header: "Adı",
    cell: ({ row }) => row.getValue("name"),
  },
   {
    accessorKey: "contactName",
    header: "İletişim Adı",
    cell: ({ row }) => row.getValue("contactName"),
  },
  {
    accessorKey: "email",
    header: ({ column }) => sortableHeader("E-Posta", column),
    cell: ({ row }) => row.getValue("email"),
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => sortableHeader("Telefon", column),
    cell: ({ row }) => row.getValue("phoneNumber"),
  },
  {
    accessorKey: "city",
    header: ({ column }) => sortableHeader("Şehir", column),
    cell: ({ row }) => <div className="capitalize">{row.original.city?.name}</div>
  },
  {
    accessorKey: "district.name",
    header: ({ column }) => sortableHeader("İlçe", column),
    cell: ({ row }) => <div className="capitalize">{row.original.district?.name || "N/A"}</div>,
  },
  {
    accessorKey: "address",
    header: ({ column }) => sortableHeader("Adres", column),
    cell: ({ row }) => <div className="capitalize">{row.getValue("address")}</div>,
  },
   {
    accessorKey: "taxOffice",
    header: ({ column }) => sortableHeader("Vergi Dairesi", column),
    cell: ({ row }) => <div className="capitalize">{row.getValue("taxOffice")}</div>,
  },
   {
    accessorKey: "taxNumber",
    header: ({ column }) => sortableHeader("Vergi Numarası", column),
    cell: ({ row }) => row.getValue("taxNumber"),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const supplier = row.original;
      return (
        <div className="flex items-center gap-6">
          <EditSupplierDrawer
            supplier={supplier}
            onSupplierUpdated={onSupplierUpdated}
          ></EditSupplierDrawer>
          <IconRowRemove
            onClick={async () => {
              const response = await service.remove(supplier.id);
              console.log("Kayıt silme yanıtı:", response);
              if (response.succeeded) {
                toast.success("Kayıt silindi!");
                if (onSupplierUpdated) {
                  await onSupplierUpdated();
                }
              } else {
                toast.error(
                  response.errors?.[0] || "Kayıt silinirken bir hata oluştu!"
                );
              }
            }}
          ></IconRowRemove>
        </div>
      );
    },
  },
];
