"use client";

import type { IBookingDetailProps } from "../props/booking-detail-props";
import { DetailDrawer } from "@/components/detail-drawer";
import { BookingDetailForm } from "./booking-details";

export const BookingDetailDrawer: React.FC<IBookingDetailProps> = ({
  bookingModel
}) => {
  return (
    <DetailDrawer
      title="Randevu Detayı"
      renderForm={() => (
        <BookingDetailForm bookingModel={bookingModel} />
      )}
    />
  );
};
