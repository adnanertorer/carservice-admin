import z from "zod";

export const mainServiceSchema = z.object({
  id: z.string().optional(),
  vehicleId: z.string(),
  description: z.string().min(10, {
    message: "Açıklama en az 10 karakter olmalıdır.",
  }).max(500, {
    message: "Açıklama en fazla 500 karakter olmalıdır.",
  }).optional(),
  cost: z.number().positive({
    message: "Maliyet pozitif bir sayı olmalıdır.",
  }).optional(),
  serviceDate: z.date({
    message: "Servis tarihi geçerli bir tarih olmalıdır.",
  }),
  mainServiceStatus: z.number().int().min(0, {
    message: "Servis durumu 0 veya daha büyük bir tamsayı olmalıdır.",
  })
});

