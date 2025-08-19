"use client";
import { EditDrawer } from "@/components/edit-drawer";
import type { EditMainServiceDrawerProps } from "../props/edit-main-service-drawer-props";
import { EditMainServiceForm } from "../forms/edit-mainservice-form";


export const EditMainServiceDrawer: React.FC<EditMainServiceDrawerProps> = ({
  onMainServiceUpdated,
  mainService,
}) => {
  return (
    <>
      <EditDrawer
        endpoint="mainservice"
        title="Ana Servis Bilgileri"
        onUpdated={onMainServiceUpdated}
        model={mainService}
        renderForm={(onSubmit) => (
          <EditMainServiceForm onSubmit={onSubmit} model={mainService} />
        )}
      />
    </>
  );
};
