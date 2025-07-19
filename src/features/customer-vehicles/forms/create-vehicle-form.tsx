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
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CreateVehicleProps } from "../props/create-vehicle-props";
import type { CustomerVehicleModel } from "../models/customer-vehicle-model";
import { customerVehicleSchema } from "../schemas/customer-vehicle-schema";
import { useParams } from "react-router-dom";

export function CreateVehicleForm({
  className,
  onSubmit,
  ...props
}: CreateVehicleProps & Omit<React.ComponentProps<"div">, "onSubmit">) {

     const { customerId } = useParams<{ customerId: string }>();
     
    const [fuelTypes] = useState<{ id: number; name: string }[]>([
        { id: 1, name: "Benzin" },
        { id: 2, name: "Dizel" },
        { id: 3, name: "LPG" },
        { id: 4, name: "Elektrik" },
    ]);


  const form = useForm<z.infer<typeof customerVehicleSchema>>({
    resolver: zodResolver(customerVehicleSchema),
    defaultValues: {
      brand: "",
      model: "",
      year: 0,
      plate: "",
      engine: "",
      fuelTypeId: 0,
      serialNumber: "",
      customerId: customerId || "",
      id: ""
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form.getValues());
    onSubmit(form.getValues() as CustomerVehicleModel);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marka</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yıl</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="plate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plaka</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="engine"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motor</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="fuelTypeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yakıt Tipi</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(val) => field.onChange(parseInt(val))}
                    defaultValue={field.value !== undefined ? String(field.value) : undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Bir yakıt tipi seçiniz" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fuelTypes.map((val) => {
                        return (
                          <SelectItem value={val.id.toString()}>
                            {val.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="serialNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Şasi Numarası</FormLabel>
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
