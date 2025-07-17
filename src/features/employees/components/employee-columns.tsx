import type { GenericService } from "@/core/services/GenericService";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "react-toastify";
import { IconRowRemove } from "@tabler/icons-react";
import type { EmployeeModel } from "../models/employee-model";

export const employeeColumns = (
  service: GenericService<EmployeeModel>,
  onEmployeeUpdated?: () => Promise<void>
): ColumnDef<EmployeeModel>[] => [
  {
    accessorKey: "name",
    header: "İsim",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "surname",
    header: "Soyisim",
    cell: ({ row }) => row.getValue("surname"),
  },
  {
    accessorKey: "email",
    header: "E-posta",
    cell: ({ row }) => row.getValue("email"),
  },
  {
    accessorKey: "phoneNumber",
    header: "Telefon Numarası",
    cell: ({ row }) => row.getValue("phoneNumber"),
  },
  {
    accessorKey: "year",
    header: "Yıl",
    cell: ({ row }) => row.getValue("year"),
  },
  {
    accessorKey: "address",
    header: "Adres",
    cell: ({ row }) => row.getValue("address"),
  },
  {
    accessorKey: "isActive",
    header: "Aktif",

    cell: ({ row }) => {
      const value = row.getValue("isActive") as boolean;
      return (
        <span
          onClick={() => {
            toast.info("Aktiflik durumu değiştirildi.");
          }}
          className={value ? "text-green-500" : "text-red-500"}
        >
          {value ? "Evet" : "Hayır"}
        </span>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <div className="flex items-center gap-6">
          <IconRowRemove
            className="cursor-pointer"
            onClick={() => {
              service
                .remove(employee.id)
                .then(() => {
                  toast.success("Çalışan başarıyla silindi.");
                  onEmployeeUpdated?.();
                })
                .catch(() => {
                  toast.error("Çalışan silinirken bir hata oluştu.");
                });
            }}
          />
        </div>
      );
    },
  },
];
