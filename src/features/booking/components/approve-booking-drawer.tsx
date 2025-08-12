"use client";

import type { ApproveBookingModel } from "../models/approve-booking-model";
import { ApproveBookingForm } from "../forms/approve-booking-form";
import type { IApproveBookingDrawerProps } from "../props/approve-booking-drawer-props";
import { ApproveDrawer } from "@/components/approve-drawer";

export const ApproveBookingDrawer: React.FC<IApproveBookingDrawerProps> = ({
  onApproveBooking,
  bookingModel
}) => {
  return (
    <ApproveDrawer<ApproveBookingModel>
      endpoint="booking"
      title="Randevu Onay"
      onCreated={onApproveBooking}
      renderForm={(handleSubmit) => (
        <ApproveBookingForm onSubmit={handleSubmit} bookingModel={bookingModel} />
      )}
    />
  );
};
