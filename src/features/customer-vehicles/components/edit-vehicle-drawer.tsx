"use client";

import { EditDrawer } from "@/components/edit-drawer";
import { EditVehicleForm } from "../forms/edit-vehicle-form";
import type { EditCustomerVehicleDrawerProps } from "../props/edit-customer-vehicle-drawer-props";

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
