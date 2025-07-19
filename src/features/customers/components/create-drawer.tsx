"use client";

import { CreateCustomerForm } from "../forms/create-customer-form";
import type { CustomerModel } from "../models/CustomerModel";
import { CreateDrawer } from "@/components/create-drawer";

interface CreateCustomerDrawerProps {
  onCustomerCreated?: () => Promise<void>;
}

export const CreateCustomerDrawer: React.FC<CreateCustomerDrawerProps> = ({
  onCustomerCreated,
}) => {

  return (
    <CreateDrawer<CustomerModel>
      endpoint="customer"
      title="Yeni Müşteri"
      onCreated={onCustomerCreated}
      renderForm={(handleSubmit) => (
        <CreateCustomerForm onSubmit={handleSubmit} />
      )}
    />
  );
};
