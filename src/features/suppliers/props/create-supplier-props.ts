import type { SupplierModel } from "../models/supplier-model";


export interface ICreateSupplierProps {
  onSubmit: (model: SupplierModel) => void;
}