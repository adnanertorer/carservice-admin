import type { MainServiceModel } from "./main-service-model";

export interface IEditMainServiceProps {
  onSubmit: (model: MainServiceModel) => void;
  state: MainServiceModel;
}