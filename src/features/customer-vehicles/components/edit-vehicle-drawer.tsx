"use client";

import { EditDrawer } from "@/components/edit-drawer";
import { EditVehicleForm } from "../forms/edit-vehicle-form";
import type { CustomerVehicleModel } from "../models/customer-vehicle-model";

interface EditCustomerVehicleDrawerProps {
  onVehicleUpdated?: () => Promise<void>;
  vehicle: CustomerVehicleModel;
  children?: React.ReactNode;
}

export const EditCustomerVehicleDrawer: React.FC<EditCustomerVehicleDrawerProps> = ({
  onVehicleUpdated,
  vehicle,
}) => {
  return (
    <>
      <EditDrawer
        endpoint="vehicle"
        title="Araç Bilgileri"
        onUpdated={onVehicleUpdated}
        model={vehicle}
        renderForm={(onSubmit) => (
          <EditVehicleForm onSubmit={onSubmit} vehicle={vehicle} />
        )}
      />
    </>
  );
};
