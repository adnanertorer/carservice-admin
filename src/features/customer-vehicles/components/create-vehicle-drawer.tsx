"use client";

import type { CustomerVehicleModel } from "../models/customer-vehicle-model";
import { CreateVehicleForm } from "../forms/create-vehicle-form";
import { CreateDrawer } from "@/components/create-drawer";
import type { CreateVehicleDrawerProps } from "../props/create-customer-vehicle-drawer-props";



export const CreateVehicleDrawer: React.FC<CreateVehicleDrawerProps> = ({
  onVehicleCreated,
}) => {
  return (
    <CreateDrawer<CustomerVehicleModel>
      endpoint="vehicle"
      title="Yeni Araç"
      onCreated={onVehicleCreated}
      renderForm={(handleSubmit) => (
        <CreateVehicleForm onSubmit={handleSubmit} />
      )}
    />
  );
};
