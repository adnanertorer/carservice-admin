import type { EmployeeModel } from "../models/employee-model";

export interface EditEmployeeDrawerProps {
  onEmployeeUpdated?: () => Promise<void>;
  employee: EmployeeModel;
  children?: React.ReactNode;
}
