import type { ColumnDef } from "@tanstack/react-table";
import type { BookingModel } from "../models/booking-model";
import { ApproveBookingDrawer } from "./approve-booking-drawer";
import { BookingDetailDrawer } from "./booking-detail-drawer";

export const BookingColumns = (
  onApproveUpdate?: () => Promise<void>
): ColumnDef<BookingModel>[] => [
  {
    accessorKey: "mobileUser.name",
    header: "Araç Sahibi",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.original.mobileUser?.name} {row.original.mobileUser?.surname}
      </div>
    ),
  },
  {
    accessorKey: "bookingDate",
    header: "Randevu Tarihi",
    cell: ({ row }) => {
      const dateValue = row.getValue("bookingDate");
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
    accessorKey: "title",
    header: "Konu",
    cell: ({ row }) => row.getValue("title"),
  },
  {
    accessorKey: "vehicleBrand",
    header: "Araç Markası",
    cell: ({ row }) => row.getValue("vehicleBrand"),
  },
  {
    accessorKey: "vehicleModel",
    header: "Araç Modeli",
    cell: ({ row }) => row.getValue("vehicleModel"),
  },
  {
    accessorKey: "vehicleYear",
    header: "Araç Yılı",
    cell: ({ row }) => row.getValue("vehicleYear"),
  },
  {
    accessorKey: "status",
    header: "Onay Durumu",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span>
          {status === 0
            ? "Beklemede"
            : status === 1
            ? "Onaylandı"
            : status === 2
            ? "Reddedildi"
            : status === 3
            ? "İptal Edildi"
            : "Bilinmiyor"}
        </span>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const booking = row.original;
      return (
        <div className="flex items-center gap-6">
          {booking.status == 0 && (
            <ApproveBookingDrawer
              bookingModel={booking}
              key={booking.id}
              onApproveBooking={onApproveUpdate}
            />
          )}
          <BookingDetailDrawer bookingModel={booking} />
        </div>
      );
    },
  },
];
