"use client";
import { EditSupplierForm } from "../forms/edit-supplier-form";
import type { SupplierModel } from "../models/supplier-model";
import { EditDrawer } from "@/components/edit-drawer";

interface EditSupplierDrawerProps {
  onSupplierUpdated?: () => Promise<void>;
  supplier: SupplierModel;
  children?: React.ReactNode;
}

export const EditSupplierDrawer: React.FC<EditSupplierDrawerProps> = ({
  onSupplierUpdated,
  supplier,
}) => {
  return (
    <>
      <EditDrawer
        endpoint="supplier"
        title="Tedarikçi Bilgileri"
        onUpdated={onSupplierUpdated}
        model={supplier}
        renderForm={(onSubmit) => (
          <EditSupplierForm onSubmit={onSubmit} supplier={supplier} />
        )}
      />
    </>
  );
};
