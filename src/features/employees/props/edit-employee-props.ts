import type { EmployeeModel } from "../models/employee-model";

export interface IEditEmployeeProps {
  onSubmit: (model: EmployeeModel) => void; 
  employee: EmployeeModel; // Added to pass existing employee data for editing
}