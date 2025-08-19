import type { MainServiceModel } from "../models/main-service-model";

export interface EditMainServiceDrawerProps {
  onMainServiceUpdated?: () => Promise<void>;
  mainService: MainServiceModel;
  children?: React.ReactNode;
}
