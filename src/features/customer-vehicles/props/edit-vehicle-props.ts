import type { CustomerVehicleModel } from "../models/customer-vehicle-model";

export interface IEditVehicleProps {
  onSubmit: (model: CustomerVehicleModel) => void;
  vehicle: CustomerVehicleModel;
}