"use client";

import { EditDrawer } from "@/components/edit-drawer";
import { EditEmployeeForm } from "../forms/edit-employee-form";
import type { EditEmployeeDrawerProps } from "../props/edit-employee-drawer-props";


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
