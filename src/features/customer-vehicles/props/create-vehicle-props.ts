import type { CustomerVehicleModel } from "../models/customer-vehicle-model";

export interface CreateVehicleProps {
  onSubmit: (model: CustomerVehicleModel) => void;
}