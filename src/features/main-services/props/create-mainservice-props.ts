import type { MainServiceModel } from "../models/main-service-model";

export interface ICreateMainServiceProps {
  onSubmit: (model: MainServiceModel) => void;
  vehicleId: string;
}