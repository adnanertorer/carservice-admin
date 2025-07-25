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
import type { ICreateMainServiceProps } from "../props/create-mainservice-props";
import { mainServiceSchema } from "../schemas/main-service-schema";
import type { MainServiceModel } from "../models/main-service-model";
import { GenericService } from "@/core/services/GenericService";
import type { CustomerVehicleModel } from "@/features/customer-vehicles/models/customer-vehicle-model";
import { useEffect, useState, useMemo } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

export function CreateMainServiceForm({
  className,
  onSubmit,
  vehicleId,
  ...props
}: ICreateMainServiceProps & Omit<React.ComponentProps<"div">, "onSubmit">) {
  const [vehicle, setVehicle] = useState<CustomerVehicleModel | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof mainServiceSchema>>({
    resolver: zodResolver(mainServiceSchema),
    defaultValues: {
      cost: 0,
      description: "",
      id: "",
      serviceDate: new Date(),
      serviceStatus: 0,
      vehicleId: vehicleId || "",
    },
  });

  const vehicleService = useMemo(
    () => new GenericService<CustomerVehicleModel>("vehicle"),
    []
  );

  useEffect(() => {
    async function fetchVehicle() {
      if (vehicleId) {
        const response = await vehicleService.getById(vehicleId);
        if (response.data) {
          setVehicle(response.data);
        }
      }
    }
    fetchVehicle();
  }, [vehicleId, vehicleService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form.getValues() as MainServiceModel);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <h2 className="text-2xl font-bold">
        {vehicle?.brand} {vehicle?.model} {vehicle?.plate} Servis Oluştur
      </h2>
      <Form {...form}>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>İşlem Kartı Açıklaması</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="serviceDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Servis Tarihi</FormLabel>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date-picker"
                        className="w-32 justify-between font-normal"
                      >
                        {field.value
                          ? new Date(field.value).toLocaleDateString()
                          : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          field.onChange(date);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
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
