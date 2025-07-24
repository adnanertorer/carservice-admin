import type { CustomerVehicleModel } from "../models/customer-vehicle-model";

export interface EditCustomerVehicleDrawerProps {
  onVehicleUpdated?: () => Promise<void>;
  vehicle: CustomerVehicleModel;
  children?: React.ReactNode;
}