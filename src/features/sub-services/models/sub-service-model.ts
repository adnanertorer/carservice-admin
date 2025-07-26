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
    cost: number;
}