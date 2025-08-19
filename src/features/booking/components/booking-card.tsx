import { Card, CardContent } from "@/components/ui/card";
import { IconRowRemove } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import type { BookingModel } from "../models/booking-model";

interface BookingCardProps {
  booking: BookingModel;
  onBookingUpdated?: () => Promise<void>;
  onDeleteRequest?: (item: BookingModel) => void;
}

export function BookingCard({
  booking,
  onBookingUpdated,
  onDeleteRequest,
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
              <p className="text-xs text-muted-foreground mb-2">{booking.mobileUser?.email}</p>
              <Label>Randevu Tarihi</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {booking.bookingDate}
              </p>
              <Label>Araç Markası</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {booking.vehicleBrand}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 float-right">
            <EditEmployeeDrawer
              employee={employee}
              onEmployeeUpdated={onEmployeeUpdated}
            />
            <IconRowRemove
              className="cursor-pointer"
              onClick={() => onDeleteRequest?.(employee)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
