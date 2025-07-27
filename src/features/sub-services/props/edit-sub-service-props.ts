import type { SubServiceModel } from "../models/sub-service-model";

export interface IEditSubServiceProps {
  onSubmit: (model: SubServiceModel) => void;
  state: SubServiceModel;
}