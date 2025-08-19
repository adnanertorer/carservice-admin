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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { IEditMainServiceProps } from "../props/edit-main-service-props";

export function EditMainServiceForm({
  className,
  onSubmit,
  model,
  ...props
}: IEditMainServiceProps & Omit<React.ComponentProps<"div">, "onSubmit">) {
  const [vehicle, setVehicle] = useState<CustomerVehicleModel | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof mainServiceSchema>>({
    resolver: zodResolver(mainServiceSchema),
    defaultValues: {
      cost: model.cost || 0,
      description: model.description || "",
      id: model.id || "",
      serviceDate: model.serviceDate || new Date(),
      mainServiceStatus: model.mainServiceStatus || 0,
      vehicleId: model.vehicleId || "",
      kilometer: model.kilometer || 0,
    },
  });

  const vehicleService = useMemo(
    () => new GenericService<CustomerVehicleModel>("vehicle"),
    []
  );

  useEffect(() => {
    async function fetchVehicle() {
      if (model.vehicleId) {
        const response = await vehicleService.getById(model.vehicleId);
        if (response.data) {
          setVehicle(response.data);
        }
      }
    }
    fetchVehicle();
  }, [model.vehicleId, vehicleService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form.getValues() as MainServiceModel);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <h4 className="font-bold">
        {vehicle?.brand} {vehicle?.model} {vehicle?.plate} Servis Oluştur
      </h4>
      <Form {...form}>
        <form className="space-y-8 text-sm" onSubmit={handleSubmit}>
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
                        className="w-60 justify-between font-normal w-full"
                      >
                        {field.value
                          ? new Date(field.value).toLocaleDateString('tr-TR') + 
                            " " + 
                            new Date(field.value).toLocaleTimeString('tr-TR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })
                          : "Tarih ve saat seçiniz"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-y-auto p-0"
                      align="start"
                    >
                      <div className="p-3">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          captionLayout="dropdown"
                          onSelect={(date) => {
                            if (date) {
                              // Mevcut saat ve dakikayı koru
                              const currentDate = field.value ? new Date(field.value) : new Date();
                              date.setHours(currentDate.getHours());
                              date.setMinutes(currentDate.getMinutes());
                              field.onChange(date);
                            }
                          }}
                        />
                        <div className="border-t pt-3 space-y-2">
                          <div className="text-sm font-medium">Saat Seçimi</div>
                          <div className="flex gap-2">
                            <Select
                              value={field.value ? new Date(field.value).getHours().toString() : "9"}
                              onValueChange={(hour) => {
                                const currentDate = field.value ? new Date(field.value) : new Date();
                                currentDate.setHours(parseInt(hour));
                                field.onChange(currentDate);
                              }}
                            >
                              <SelectTrigger className="w-20">
                                <SelectValue placeholder="Saat" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 24 }, (_, i) => (
                                  <SelectItem key={i} value={i.toString()}>
                                    {i.toString().padStart(2, '0')}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Select
                              value={field.value ? new Date(field.value).getMinutes().toString() : "0"}
                              onValueChange={(minute) => {
                                const currentDate = field.value ? new Date(field.value) : new Date();
                                currentDate.setMinutes(parseInt(minute));
                                field.onChange(currentDate);
                              }}
                            >
                              <SelectTrigger className="w-20">
                                <SelectValue placeholder="Dakika" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 4 }, (_, i) => i * 15).map((minute) => (
                                  <SelectItem key={minute} value={minute.toString()}>
                                    {minute.toString().padStart(2, '0')}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => setOpen(false)}
                          >
                            Tamam
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="kilometer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kilometre</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          
          <Button type="submit">Güncelle</Button>
        </form>
      </Form>
    </div>
  );
}
