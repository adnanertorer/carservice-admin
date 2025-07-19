import z from "zod";

export const customerFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "İsim alanı en az 2 karakter olmalıdır.",
  }),
  surname: z.string().min(2, {
    message: "Soyisim alanı en az 2 karakter olmalı",
  }),
  email: z.string().min(5, {
    message: "Lütfen geçerli bir email yazınız",
  }),
  phone: z
    .string()
    .min(10, {
      message: "En az 10 karakterden oluşur",
    })
    .max(16, {
      message: "En fazla 16 karakterden oluşur",
    }),
  address: z.string().min(10, {
    message: "En az 10 karakterden oluşmalı",
  }),
  cityId: z.number(),
  districtId: z.number(),
  taxOffice: z.string().optional(),
  taxNumber: z.string().optional(),
  isActive: z.boolean(),
});