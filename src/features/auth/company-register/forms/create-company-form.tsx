"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/core/api/axios";
import { useNavigate } from "react-router-dom";
import { CreateCompanyUserSchema } from "../schemas/company-register-schema";
import carRepairImage from "@/assets/fixy.png";
import type { CityModel } from "@/shared/models/city-model";
import { useEffect, useState } from "react";
import type { DistrictModel } from "@/features/customers/models/DistrictModel";
import { GenericService } from "@/core/services/GenericService";
import type { MainResponse } from "@/core/api/responses/PaginatedResponse";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";
import { toast } from "react-toastify";

type CreateCompanyUserDto = z.infer<typeof CreateCompanyUserSchema>;

export function CreateCompanyForm({
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "onSubmit">) {
  const navigate = useNavigate();

  const [cities, setCities] = useState<CityModel[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<number>(0);
  const [districts, setDistricts] = useState<DistrictModel[]>([]);
  const cityService = new GenericService<CityModel>("/geographicinfo/cities");

  useEffect(() => {
    cityService.getList().then((res) => {
      if (res.succeeded && res.data?.items && res.data?.items.length > 0) {
        setCities(res.data?.items);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (!selectedCityId) return;
      const response = await api.get<MainResponse<DistrictModel>>(
        `geographicinfo/districts?cityId=${selectedCityId}`
      );
      if (response.data?.data?.items && response.data?.data?.items.length > 0) {
        setDistricts([]); // önceki ilçeleri temizle
        // yeni ilçeleri ayarla
        setDistricts(response.data?.data?.items);
      }
    };
    fetchDistricts();
  }, [selectedCityId]);

  const form = useForm<z.infer<typeof CreateCompanyUserSchema>>({
    resolver: zodResolver(CreateCompanyUserSchema),
    defaultValues: {
      user: {
        email: "",
        password: "",
        name: "",
        surname: "",
        phoneNumber: "",
      },
      company: {
        companyName: "",
        authorizedName: "",
        authorizedSurname: "",
        taxNumber: "",
        taxOffice: "",
        cityId: 0,
        districtId: 0,
        companyAddress: "",
        companyPhone: "",
        companyEmail: "",
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form.getValues());
    onSubmit(form.getValues() as CreateCompanyUserDto);
  };

  const onSubmit = async (data: CreateCompanyUserDto) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    api.post<ISingleResponse<any>>("/user/create-company-user", data).then((res) => {
        if(res.data.succeeded){
            console.log(res.data.data);
            toast.success("Firma kaydı başarılı!");
            // navigate to success page or reset form
           navigate("/opt-approve");
        }
    });
  };

  return (
    <div className={cn("space-y-8", className)} {...props}>
        <h3 className="flex flex-col items-center justify-center rounded-lg">Car Service Firma Kayıt Formu</h3>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 1. SÜTUN: GÖRSEL */}
            <div className="flex flex-col items-center justify-center rounded-lg">
              <img
                src={carRepairImage}
                alt="Car Service"
                className="w-full max-w-sm rounded-md object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold mb-4">
                Kullanıcı Bilgileri
              </h3>
              <FormField
                control={form.control}
                name="user.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-Posta</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user.password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şifre</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ad</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user.surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Soyad</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user.phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <h3 className="font-semibold mb-4">Şirket Bilgileri</h3>
              <FormField
                control={form.control}
                name="company.companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şirket Adı</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company.authorizedName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yetkili Adı</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company.authorizedSurname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yetkili Soyadı</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company.taxNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vergi Numarası</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company.taxOffice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vergi Dairesi</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 4. SÜTUN: COMPANY BİLGİLERİ (SON 5) */}
            <div className="mt-8 lg:mt-12">
              <FormField
                control={form.control}
                name="company.cityId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İl</FormLabel>
                    <Select
                      onValueChange={(val) => {
                        const cityId = parseInt(val);
                        setSelectedCityId(cityId);
                        field.onChange(cityId);
                      }}
                      defaultValue={
                        field.value ? String(field.value) : undefined
                      }
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Bir il seçiniz" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cities.map((val) => (
                          <SelectItem key={val.id} value={val.id.toString()}>
                            {val.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company.districtId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İlçe</FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(parseInt(val))}
                      defaultValue={
                        field.value ? String(field.value) : undefined
                      }
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Bir ilçe seçiniz" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {districts.map((val) => (
                          <SelectItem key={val.id} value={val.id.toString()}>
                            {val.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company.companyAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şirket Adresi</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company.companyPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şirket Telefonu</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company.companyEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şirket E-Posta</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="float-right mr-4 mt-4"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Kaydediliyor..." : "Kaydet"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
