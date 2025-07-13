import type { CustomerModel } from "../models/CustomerModel";

export interface CreateCustomerFormProps {
  onSubmit: (model: CustomerModel) => void;
}