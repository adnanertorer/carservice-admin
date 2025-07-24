import z from "zod";

export const supplierSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "İsim alanı en az 2 karakter olmalıdır.",
  }),
  contactName: z.string().min(2, {
    message: "İletişim adı alanı en az 2 karakter olmalıdır.",
  }).max(50, {
    message: "İletişim adı alanı en fazla 50 karakter olmalıdır.",
  }),
  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz.",
  }).optional(),
  phoneNumber: z.string().min(10, {
    message: "Telefon numarası en az 10 karakter olmalıdır.",
  }).max(20, {
    message: "Telefon numarası en fazla 20 karakter olmalıdır.",
  }),
  address: z.string().min(10, {
    message: "Adres alanı en az 10 karakter olmalıdır.",
  }),
  cityId: z.number(),
  districtId: z.number(),
  taxOffice: z.string().optional(),
  taxNumber: z.string().optional(),
});
