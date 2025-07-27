"use client";

import { CreateServiceDrawer } from "@/components/create-service-drawer";
import type { SubServiceModel } from "../models/sub-service-model";
import { CreateSubServiceForm } from "../forms/create-subservice-form";

interface CreateSubServiceDrawerProps {
  onSubServiceCreated?: () => Promise<void>;
  mainServiceId: string;
}

export const CreateSubServiceDrawer: React.FC<CreateSubServiceDrawerProps> = ({
  onSubServiceCreated,
  mainServiceId
}) => {

  return (
    <CreateServiceDrawer<SubServiceModel>
      endpoint="subservice"
      title="Yeni Alt Servis"
      onCreated={onSubServiceCreated}
      renderForm={(handleSubmit) => (
        <CreateSubServiceForm onSubmit={handleSubmit} mainServiceId={mainServiceId} />
      )}
    />
  );
};
