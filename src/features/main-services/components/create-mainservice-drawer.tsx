"use client";

import type { MainServiceModel } from "../models/main-service-model";
import { CreateMainServiceForm } from "../forms/create-mainservice-form";
import { CreateServiceDrawer } from "@/components/create-service-drawer";

interface CreateMainServiceDrawerProps {
  onMainServiceCreated?: () => Promise<void>;
  vehicleId: string;
}

export const CreateMainServiceDrawer: React.FC<CreateMainServiceDrawerProps> = ({
  onMainServiceCreated,
  vehicleId
}) => {

  return (
    <CreateServiceDrawer<MainServiceModel>
      endpoint="mainservice"
      title="Yeni Ana Servis"
      onCreated={onMainServiceCreated}
      renderForm={(handleSubmit) => (
        <CreateMainServiceForm onSubmit={handleSubmit} vehicleId={vehicleId} />
      )}
    />
  );
};
