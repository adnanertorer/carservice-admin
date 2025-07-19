import type { CustomerModel } from "../models/CustomerModel";

export interface EditCustomerFormProps {
  onSubmit: (model: CustomerModel) => void;
  state: CustomerModel;
}