import type { ColumnDef } from "@tanstack/react-table";
import { IconRowRemove } from "@tabler/icons-react";
import { toast } from "react-toastify";
import type { GenericService } from "@/core/services/GenericService";
import type { SubServiceModel } from "../models/sub-service-model";
import { EditSubServiceDrawer } from "./edit-subservice-drawer";

export const SubServiceColumns = (
  service: GenericService<SubServiceModel>,
  onSubServiceUpdated?: () => Promise<void>
): ColumnDef<SubServiceModel>[] => [
  {
    accessorKey: "operation",
    header: "İşlem",
    cell: ({ row }) => row.getValue("operation"),
  },
  {
    accessorKey: "employee.name",
    header: "Personel",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.original.employee?.name} {row.original.employee?.surname}
      </div>
    ),
  },
  {
    accessorKey: "operationDate",
    header: "İşlem Tarihi",
    cell: ({ row }) => {
      const dateValue = row.getValue("operationDate");
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
    accessorKey: "description",
    header: "Açıklama",
    cell: ({ row }) => row.getValue("description"),
  },
  {
    accessorKey: "supplier.name",
    header: "Tedarikçi",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.supplier?.name}</div>
    ),
  },
  {
    accessorKey: "material",
    header: "Malzeme",
    cell: ({ row }) => row.getValue("material"),
  },
  {
    accessorKey: "materialBrand",
    header: "Malzeme Markası",
    cell: ({ row }) => row.getValue("materialBrand"),
  },
  {
    accessorKey: "discount",
    header: "İndirim",
    cell: ({ row }) => row.getValue("discount"),
  },
  {
    accessorKey: "cost",
    header: "Maliyet",
    cell: ({ row }) => row.getValue("cost"),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const subService = row.original;
      return (
        <div className="flex items-center gap-6">
          <EditSubServiceDrawer
            state={subService}
            onSubServiceUpdated={onSubServiceUpdated}
          ></EditSubServiceDrawer>
          <IconRowRemove
            onClick={async () => {
              if (!subService.id) {
                toast.error("Geçersiz kayıt: ID bulunamadı!");
                return;
              }
              const response = await service.remove(subService.id);
              console.log("Kayıt silme yanıtı:", response);
              if (response.succeeded) {
                toast.success("Kayıt silindi!");
                if (onSubServiceUpdated) {
                  await onSubServiceUpdated();
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
