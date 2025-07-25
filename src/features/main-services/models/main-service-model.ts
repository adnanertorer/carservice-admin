import type { CustomerVehicleModel } from "@/features/customer-vehicles/models/customer-vehicle-model";

export type MainServiceModel = {
  id: string;
  description?: string;
  cost: number;
  vehicleId: string;
  serviceDate: Date;
  mainServiceStatus: number;

  vehicle?: CustomerVehicleModel
};
