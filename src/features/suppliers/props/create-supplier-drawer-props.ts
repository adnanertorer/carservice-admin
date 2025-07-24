import type { SupplierModel } from "../models/supplier-model";

export interface CreateSupplierDrawerProps {
  onSupplierCreated?: () => Promise<void>;
  supplierModel?: SupplierModel;
}