"use client";

import type { CustomerModel } from "../models/CustomerModel";
import { EditCustomerForm } from "../forms/edit-customer-form";
import { EditDrawer } from "@/components/edit-drawer";

interface EditCustomerDrawerProps {
  onCustomerUpdated?: () => Promise<void>;
  customer: CustomerModel;
  children?: React.ReactNode;
}

export const EditCustomerDrawer: React.FC<EditCustomerDrawerProps> = ({
  onCustomerUpdated,
  customer,
}) => {
  return (
    <>
      <EditDrawer
        endpoint="customer"
        title="Müşteri Bilgileri"
        onUpdated={onCustomerUpdated}
        model={customer}
        renderForm={(onSubmit) => (
          <EditCustomerForm onSubmit={onSubmit} state={customer} />
        )}
      />
    </>
  );
};
