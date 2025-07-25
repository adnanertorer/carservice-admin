import type { MainServiceModel } from "../models/main-service-model";

export interface CreateMainServiceDrawerProps {
  onMainServiceCreated?: () => Promise<void>;
  mainServiceModel?: MainServiceModel;
}