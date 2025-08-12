import type { MobileUserModel } from "./mobile-user-model";

export type BookingModel = {
  id: string;
  mobileUserId: string;
  companyId: string;
  bookingDate: string;
  title: string;
  description: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: number;
  status: number;
  companyMessage?: string;

  mobileUser?: MobileUserModel;
}