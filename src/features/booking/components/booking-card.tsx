import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { BookingModel } from "../models/booking-model";
import { ApproveBookingDrawer } from "./approve-booking-drawer";
import { BookingDetailDrawer } from "./booking-detail-drawer";

interface BookingCardProps {
  booking: BookingModel;
  onApproveUpdate?: () => Promise<void>;
}

export function BookingCard({
  booking,
  onApproveUpdate,
}: BookingCardProps) {
  return (
    <Card className="w-full mb-3">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-sm mb-2">
                {booking.mobileUser?.name} {booking.mobileUser?.surname}
              </h3>
              <Label>E-Posta</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {booking.mobileUser?.email}
              </p>
              <Label>Randevu Tarihi</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {booking.bookingDate}
              </p>
              <Label>Araç Markası</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {booking.vehicleBrand}
              </p>
              <Label>Araç Modeli</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {booking.vehicleModel}
              </p>
              <Label>Araç Yılı</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {booking.vehicleYear}
              </p>
              <Label>Durum</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {booking.status === 0
                  ? "Beklemede"
                  : booking.status === 1
                  ? "Onaylandı"
                  : booking.status === 2
                  ? "Reddedildi"
                  : booking.status === 3
                  ? "İptal Edildi"
                  : "Bilinmiyor"}
              </p>
              <Label>Mesaj</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {booking.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 float-right">
            {booking.status == 0 && (
              <ApproveBookingDrawer
                bookingModel={booking}
                key={booking.id}
                onApproveBooking={onApproveUpdate}
              />
            )}
            <BookingDetailDrawer bookingModel={booking} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
