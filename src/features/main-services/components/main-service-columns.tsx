import type { ColumnDef } from "@tanstack/react-table";
import { IconRowRemove, IconSettingsPlus } from "@tabler/icons-react";
import { toast } from "react-toastify";
import type { GenericService } from "@/core/services/GenericService";
import type { MainServiceModel } from "../models/main-service-model";

export const MainServiceColumns = (
  service: GenericService<MainServiceModel>,
  onMainServiceUpdated?: () => Promise<void>): ColumnDef<MainServiceModel>[] => [
    {
    accessorKey: "vehicle.brand",
    header: "Marka",
    cell: ({ row }) => <div className="capitalize">{row.original.vehicle?.brand}</div>,
  },
  {
    accessorKey: "vehicle.model",
    header: "Model",
    cell: ({ row }) => <div className="capitalize">{row.original.vehicle?.model}</div>,
  },
   {
    accessorKey: "description",
    header: "Açıklama",
    cell: ({ row }) => row.getValue("description"),
  },
  {
    accessorKey: "cost",
    header: "Maliyet",
    cell: ({ row }) => row.getValue("cost"),
  },
   {
    accessorKey: "mainServiceStatus",
    header: "Servis Durumu",
    cell: ({ row }) => {
      const status = row.original.mainServiceStatus;
      console.log("Service Status:", status);
      return (
        <div className="capitalize">
          {status == 0 ? "Açık" : status == 1 ? "Hazırlanıyor" : status == 2 ? "Tamamlandı" : status == 3 ? "İptal Edildi" : null}
        </div>
      );
    },
  },
  {
    accessorKey: "serviceDate",
    header: "Servis Tarihi",
    cell: ({ row }) => {
      const dateValue = row.getValue("serviceDate");
      const date = dateValue instanceof Date ? dateValue : new Date(dateValue as string);
      return date.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const mainService = row.original;
      return (
        <div className="flex items-center gap-6">
          {mainService.mainServiceStatus === 0 && (
            <IconSettingsPlus></IconSettingsPlus>
          )}
          <IconRowRemove
            onClick={async () => {
              const response = await service.remove(mainService.id);
              console.log("Kayıt silme yanıtı:", response);
              if (response.succeeded) {
                toast.success("Kayıt silindi!");
                if (onMainServiceUpdated) {
                  await onMainServiceUpdated();
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
