import type { SubServiceModel } from "../models/sub-service-model";

export interface ICreateSubServiceProps {
  onSubmit: (model: SubServiceModel) => void;
  mainServiceId: string;
}