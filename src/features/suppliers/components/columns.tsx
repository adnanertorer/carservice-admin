import type { ColumnDef } from "@tanstack/react-table";
import { IconRowRemove } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { sortableHeader } from "@/components/sortable-header";
import type { SupplierModel } from "../models/supplier-model";
import { EditSupplierDrawer } from "./edit-drawer";

export const columns = (
  onSupplierUpdated?: () => Promise<void>,
  onDeleteRequest?: (item: SupplierModel) => void
): ColumnDef<SupplierModel>[] => [
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
            onClick={() => {onDeleteRequest?.(supplier)}}
          ></IconRowRemove>
        </div>
      );
    },
  },
];
