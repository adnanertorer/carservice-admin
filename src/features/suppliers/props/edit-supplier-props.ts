import type { SupplierModel } from "../models/supplier-model";

export interface IEditSupplierProps {
  onSubmit: (model: SupplierModel) => void; 
  supplier: SupplierModel; // Added to pass existing supplier data for editing
}