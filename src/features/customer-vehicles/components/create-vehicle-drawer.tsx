"use client";

import type { CustomerVehicleModel } from "../models/customer-vehicle-model";
import { CreateVehicleForm } from "../forms/create-vehicle-form";
import { CreateDrawer } from "@/components/create-drawer";

interface CreateVehicleDrawerProps {
  onVehicleCreated?: () => Promise<void>;
}

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
