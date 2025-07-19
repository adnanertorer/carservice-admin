"use client";

import { EditDrawer } from "@/components/edit-drawer";
import type { EmployeeModel } from "../models/employee-model";
import { EditEmployeeForm } from "../forms/edit-employee-form";

interface EditEmployeeDrawerProps {
  onEmployeeUpdated?: () => Promise<void>;
  employee: EmployeeModel;
  children?: React.ReactNode;
}

export const EditEmployeeDrawer: React.FC<EditEmployeeDrawerProps> = ({
  onEmployeeUpdated,
  employee,
}) => {
  return (
    <>
      <EditDrawer
        endpoint="employee"
        title="Çalışan Bilgileri"
        onUpdated={onEmployeeUpdated}
        model={employee}
        renderForm={(onSubmit) => (
          <EditEmployeeForm onSubmit={onSubmit} employee={employee} />
        )}
      />
    </>
  );
};
