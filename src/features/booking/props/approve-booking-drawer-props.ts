import type { BookingModel } from "../models/booking-model";

export interface IApproveBookingDrawerProps {
  onApproveBooking?: () => Promise<void>;
  bookingModel: BookingModel;
}