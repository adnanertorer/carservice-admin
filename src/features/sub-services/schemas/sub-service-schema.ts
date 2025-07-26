import z from "zod";

export const subServiceSchema = z.object({
    id: z.string().optional(),
    mainServiceId: z.string(),
    operation: z.string(),
    employeeId: z.string().optional(),
    operationDate: z.date(),
    description: z.string().optional(),
    material: z.string().optional(),
    materialBrand: z.string().optional(),
    supplierId: z.string().optional(),
    discount: z.number().optional(),
    cost: z.number(),
});