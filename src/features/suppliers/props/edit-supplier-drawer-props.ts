import type { SupplierModel } from "../models/supplier-model";

export interface EditSupplierDrawerProps {
  onSupplierUpdated?: () => Promise<void>;
  supplier: SupplierModel;
  children?: React.ReactNode;
}
