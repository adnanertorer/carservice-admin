"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import type { CityModel } from "@/shared/models/city-model";
import { GenericService } from "@/core/services/GenericService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DistrictModel } from "@/shared/models/district-model";
import type { MainResponse } from "@/core/api/responses/PaginatedResponse";
import api from "@/core/api/axios";
import type { CreateCustomerFormProps } from "../props/create-customer-props";
import type { CustomerModel } from "../models/CustomerModel";
import { customerFormSchema } from "../schemas/customer-schema";

export function CreateCustomerForm({
  className,
  onSubmit,
  ...props
}: CreateCustomerFormProps & Omit<React.ComponentProps<"div">, "onSubmit">) {
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

  const form = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      address: "",
      taxNumber: "",
      cityId: 0,
      districtId: 0,
      isActive: true,
      taxOffice: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form.getValues());
    onSubmit(form.getValues() as CustomerModel);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adı</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Soyadı</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Posta</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cityId"
            render={({field}) => (
              <FormItem>
                <FormLabel>İl</FormLabel>
                <Select
                  onValueChange={(val) => {
                    const cityId = parseInt(val);
                    setSelectedCityId(cityId);
                    field.onChange(cityId);
                  }}
                  defaultValue={field.value !== undefined ? String(field.value) : undefined}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Bir il seçiniz" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cities.map((val) => {
                      return (
                        <SelectItem value={val.id.toString()}>
                          {val.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="districtId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>İlçe</FormLabel>
                <Select
                  onValueChange={(val) => field.onChange(parseInt(val))}
                  defaultValue={field.value !== undefined ? String(field.value) : undefined}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Bir ilçe seçiniz" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {districts.map((val) => {
                      return (
                        <SelectItem value={val.id.toString()}>
                          {val.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adres</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="taxOffice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vergi Dairesi</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="taxNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vergi Dairesi</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Kaydet</Button>
        </form>
      </Form>
    </div>
  );
}
