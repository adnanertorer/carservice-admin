import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z
    .string()
    .min(8, "Şifre en az 8 karakter olmalı")
    .regex(/[A-Z]/, "Şifre en az bir büyük harf içermeli")
    .regex(/[a-z]/, "Şifre en az bir küçük harf içermeli")
    .regex(/\d/, "Şifre en az bir rakam içermeli")
    .regex(/[^A-Za-z0-9]/, "Şifre en az bir özel karakter içermeli"),
  name: z.string().min(2, "İsim en az 2 karakter olmalı"),
  surname: z.string().min(2, "Soyisim en az 2 karakter olmalı"),
  phoneNumber: z
    .string()
    .regex(/^\d{10,11}$/, "Telefon numarası geçersiz (10-11 haneli olmalı)"),
});

export const CreateCompanySchema = z.object({
  companyName: z.string().min(2, "Şirket adı en az 2 karakter olmalı"),
  authorizedName: z.string().min(2, "Yetkili adı en az 2 karakter olmalı"),
  authorizedSurname: z.string().min(2, "Yetkili soyadı en az 2 karakter olmalı"),
  taxNumber: z.string().regex(/^\d{10}$/, "Vergi numarası 10 haneli olmalı"),
  taxOffice: z.string().min(2, "Vergi dairesi adı geçersiz"),
  cityId: z.number().int().positive("Geçerli bir şehir ID'si giriniz"),
  districtId: z.number().int().positive("Geçerli bir ilçe ID'si giriniz"),
  companyAddress: z.string().min(5, "Adres en az 5 karakter olmalı"),
  companyPhone: z
    .string()
    .regex(/^\d{10,11}$/, "Telefon numarası geçersiz (10-11 haneli olmalı)"),
  companyEmail: z.string().email("Geçerli bir e-posta adresi giriniz"),
});

export const CreateCompanyUserSchema = z.object({
  user: CreateUserSchema,
  company: CreateCompanySchema,
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type CreateCompanyDto = z.infer<typeof CreateCompanySchema>;
export type CreateCompanyUserDto = z.infer<typeof CreateCompanyUserSchema>;
