"use client";

import { EditDrawer } from "@/components/edit-drawer";
import type { SubServiceModel } from "../models/sub-service-model";
import { EditSubServiceForm } from "../forms/edit-subservice-form";

interface EditSubServiceDrawerProps {
  onSubServiceUpdated?: () => Promise<void>;
  state: SubServiceModel;
  children?: React.ReactNode;
}

export const EditSubServiceDrawer: React.FC<EditSubServiceDrawerProps> = ({
  onSubServiceUpdated,
  state,
}) => {
  return (
    <>
      <EditDrawer
        endpoint="subservice"
        title="Alt Hizmet Bilgileri"
        onUpdated={onSubServiceUpdated}
        model={state}
        renderForm={(onSubmit) => (
          <EditSubServiceForm onSubmit={onSubmit} state={state} />
        )}
      />
    </>
  );
};
