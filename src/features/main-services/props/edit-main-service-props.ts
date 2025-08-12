import type { MainServiceModel } from "../models/main-service-model";
export interface IEditMainServiceProps {
  onSubmit: (model: MainServiceModel) => void;
  state: MainServiceModel;
}