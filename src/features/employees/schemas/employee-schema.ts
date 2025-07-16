import z from "zod";

export const employeeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "İsim alanı en az 2 karakter olmalıdır.",
  }),
  surname: z.string().min(2, {
    message: "Soyisim alanı en az 2 karakter olmalıdır.",
  }),
  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Telefon numarası en az 10 karakter olmalıdır.",
  }),
  address: z.string().min(10, {
    message: "Adres alanı en az 10 karakter olmalıdır.",
  }),
  isActive: z.boolean(),
});