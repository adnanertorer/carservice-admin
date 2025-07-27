import type { SubServiceModel } from "../models/sub-service-model";

export interface CreateSubServiceDrawerProps {
  onSubServiceCreated?: () => Promise<void>;
  subServiceModel?: SubServiceModel;
}