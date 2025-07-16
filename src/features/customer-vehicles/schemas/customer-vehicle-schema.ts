import z from "zod";

export const customerVehicleSchema = z.object({
  id: z.string().optional(),
  customerId: z.string(),
  brand: z.string().min(2, {
    message: "Marka alanı en az 2 karakter olmalıdır.",
  }),
  model: z.string().min(2, {
    message: "Model alanı en az 2 karakter olmalı",
  }),
  year: z.number().min(1900).max(new Date().getFullYear()+1, {
    message: "Yıl geçerli bir yıl olmalıdır.",
  }),
  plate: z
    .string()
    .min(10, {
      message: "En az 10 karakterden oluşur",
    })
    .max(16, {
      message: "En fazla 16 karakterden oluşur",
    }),
  engine: z.string().min(2, {
    message: "En az 2 karakterden oluşmalı",
  }),
  fuelTypeId: z.number(),
  serialNumber: z.string().min(2, {
    message: "En az 2 karakterden oluşmalı",
  }),
});