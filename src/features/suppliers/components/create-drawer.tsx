"use client";

import { CreateDrawer } from "@/components/create-drawer";
import type { SupplierModel } from "../models/supplier-model";
import { CreateSupplierForm } from "../forms/create-supplier-form";

interface CreateSupplierDrawerProps {
  onSupplierCreated?: () => Promise<void>;
}

export const CreateSupplierDrawer: React.FC<CreateSupplierDrawerProps> = ({
  onSupplierCreated,
}) => {

  return (
    <CreateDrawer<SupplierModel>
      endpoint="supplier"
      title="Yeni Tedarikçi"
      onCreated={onSupplierCreated}
      renderForm={(handleSubmit) => (
        <CreateSupplierForm onSubmit={handleSubmit} />
      )}
    />
  );
};
