import type { ApproveBookingModel } from "../models/approve-booking-model";
import type { BookingModel } from "../models/booking-model";


export interface IApproveBookingProps {
  onSubmit: (model: ApproveBookingModel) => void;
  bookingModel: BookingModel;
}