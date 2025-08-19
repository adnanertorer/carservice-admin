import type { ColumnDef } from "@tanstack/react-table";
import {
  IconListDetails,
  IconRowRemove,
  IconSettingsPlus,
} from "@tabler/icons-react";
import type { MainServiceModel } from "../models/main-service-model";
import type { NavigateFunction } from "react-router-dom";
import { EditMainServiceDrawer } from "./edit-mainservice-drawer";

export const MainServiceColumns = (
  navigate?: NavigateFunction,
  onMainServiceUpdated?: () => Promise<void>,
  onDeleteRequest?: (item: MainServiceModel) => void
): ColumnDef<MainServiceModel>[] => [
  {
    accessorKey: "vehicle.plate",
    header: "Plaka",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.vehicle?.plate}</div>
    ),
  },
  {
    accessorKey: "vehicle.brand",
    header: "Marka",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.vehicle?.brand}</div>
    ),
  },
  {
    accessorKey: "vehicle.model",
    header: "Model",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.vehicle?.model}</div>
    ),
  },
  {
    accessorKey: "kilometer",
    header: "Kilometre",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("kilometer")}</div>
    ),
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
      return (
        <div className="capitalize">
          {status == 0
            ? "Açık"
            : status == 1
            ? "Hazırlanıyor"
            : status == 2
            ? "Tamamlandı"
            : status == 3
            ? "İptal Edildi"
            : null}
        </div>
      );
    },
  },
  {
    accessorKey: "serviceDate",
    header: "Servis Tarihi",
    cell: ({ row }) => {
      const dateValue = row.getValue("serviceDate");
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const mainService = row.original;
      return (
        <div className="flex items-center gap-6">
          {mainService.mainServiceStatus === 0 && (
            <>
              <IconSettingsPlus
                onClick={() => {
                  if (navigate) {
                    navigate(`/main-services/${mainService.id}/sub-services`);
                  }
                }}
              ></IconSettingsPlus>
              <IconRowRemove
                onClick={() => onDeleteRequest?.(mainService)}
              ></IconRowRemove>
              <EditMainServiceDrawer
                mainService={mainService}
                onMainServiceUpdated={onMainServiceUpdated}
              ></EditMainServiceDrawer>
            </>
          )}
          {mainService.mainServiceStatus !== 0 && (
            <IconListDetails
              onClick={() => {
                if (navigate) {
                  navigate(`/main-services/${mainService.id}/sub-services`);
                }
              }}
            ></IconListDetails>
          )}
        </div>
      );
    },
  },
];
