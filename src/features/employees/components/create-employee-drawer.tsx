"use client";

import type { EmployeeModel } from "../models/employee-model";
import type { CreateEmployeeDrawerProps } from "../props/create-employee-drawer-props";
import { CreateEmployeeForm } from "./create-employee-form";
import { CreateDrawer } from "@/components/create-drawer";

export const CreateEmployeeDrawer: React.FC<CreateEmployeeDrawerProps> = ({
  onEmployeeCreated,
}) => {
  return (
    <CreateDrawer<EmployeeModel>
      endpoint="employee"
      title="Yeni Çalışan"
      onCreated={onEmployeeCreated}
      renderForm={(handleSubmit) => (
        <CreateEmployeeForm onSubmit={handleSubmit} />
      )}
    />
  );
};
