"use client";

import { CreateCustomerForm } from "./create-customer-form";
import { GenericService } from "@/core/services/GenericService";
import type { CustomerModel } from "../models/CustomerModel";
import { toast } from "react-toastify";
import { useState } from "react";
import { CreateDrawer } from "@/components/create-drawer";

interface CreateCustomerDrawerProps {
  onCustomerCreated?: () => Promise<void>;
}

export const CreateCustomerDrawer: React.FC<CreateCustomerDrawerProps> = ({
  onCustomerCreated,
}) => {
  const [open, setOpen] = useState(false);
  const service = new GenericService<CustomerModel>("customer");

  const handleCreate = async (model: CustomerModel) => {
    await service.save(model);
    toast.success("Kayıt başarılı!");
    setOpen(false);
    if (onCustomerCreated) {
      await onCustomerCreated();
    }
  };

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
