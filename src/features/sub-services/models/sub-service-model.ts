import type { EmployeeModel } from "@/features/employees/models/employee-model";
import type { MainServiceModel } from "@/features/main-services/models/main-service-model";
import type { SupplierModel } from "@/features/suppliers/models/supplier-model";

export type SubServiceModel = {
    id?: string;
    mainServiceId: string;
    operation: string;
    employeeId?: string;
    operationDate: Date;
    description?: string;
    material?: string;
    materialBrand?: string;
    supplierId?: string;
    discount?: number;
    materialCost?: number;
    cost: number;
    employee?: EmployeeModel;
    supplier?: SupplierModel;
    mainService?: MainServiceModel;
}