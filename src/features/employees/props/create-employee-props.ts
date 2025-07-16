import type { EmployeeModel } from "../models/employee-model";

export interface ICreateEmployeeProps {
  onSubmit: (model: EmployeeModel) => void; 
}