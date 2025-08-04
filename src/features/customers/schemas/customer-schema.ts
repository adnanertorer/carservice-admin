import z from "zod";

export const customerFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "İsim alanı en az 2 karakter olmalıdır.",
  }),
  surname: z.string().min(2, {
    message: "Soyisim alanı en az 2 karakter olmalı",
  }),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z
      .string()
      .regex(/^\d{10,11}$/, "Telefon numarası geçersiz (10-11 haneli olmalı)"),
  address: z.string().min(10, {
    message: "En az 10 karakterden oluşmalı",
  }),
  cityId: z.number().int().positive("Geçerli bir şehir ID'si giriniz"),
  districtId: z.number().int().positive("Geçerli bir ilçe ID'si giriniz"),
  taxOffice: z.string().optional(),
  taxNumber: z.string().optional(),
  isActive: z.boolean(),
});