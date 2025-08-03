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
import { GenericService } from "@/core/services/GenericService";
import { useEffect, useState, useMemo } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subServiceSchema } from "../schemas/sub-service-schema";
import type { ICreateSubServiceProps } from "../props/create-subservice-props";
import type { SubServiceModel } from "../models/sub-service-model";
import type { EmployeeModel } from "@/features/employees/models/employee-model";
import type { SupplierModel } from "@/features/suppliers/models/supplier-model";

export function CreateSubServiceForm({
  className,
  onSubmit,
  mainServiceId,
  ...props
}: ICreateSubServiceProps & Omit<React.ComponentProps<"div">, "onSubmit">) {
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierModel[]>([]);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof subServiceSchema>>({
    resolver: zodResolver(subServiceSchema),
    defaultValues: {
      cost: 0,
      description: "",
      operationDate: new Date(),
      mainServiceId: mainServiceId || "",
      discount: 0,
      employeeId: undefined,
      id: "",
      material: "",
      materialBrand: "",
      operation: "",
      supplierId: undefined,
    },
  });

  const employeeService = useMemo(
    () => new GenericService<EmployeeModel>("employee"),
    []
  );

  const supplierService = useMemo(
    () => new GenericService<SupplierModel>("supplier"),
    []
  );

  //get employees
  useEffect(() => {
    async function fetchEmployees() {
      const response = await employeeService.getByFilter(
        undefined,
        undefined,
        0,
        99,
        "",
        true
      );
      if (response.data?.items) {
        setEmployees(response.data.items);
      }
    }
    fetchEmployees();
  }, [employeeService]);

  //get suppliers
  useEffect(() => {
    async function fetchSuppliers() {
      const response = await supplierService.getByFilter(
        undefined,
        undefined,
        0,
        99,
        "",
        true
      );
      if (response.data?.items) {
        setSuppliers(response.data.items);
      }
    }
    fetchSuppliers();
  }, [supplierService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form.getValues() as SubServiceModel);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <FormField
            control={form.control}
            name="operation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yapılan İşlem</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="operationDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>İşlem Tarihi</FormLabel>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date-picker"
                        className="w-60 justify-between font-normal"
                      >
                        {field.value
                          ? new Date(field.value).toLocaleDateString("tr-TR") +
                            " " +
                            new Date(field.value).toLocaleTimeString("tr-TR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Tarih ve saat seçiniz"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
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
                              const currentDate = field.value
                                ? new Date(field.value)
                                : new Date();
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
                              value={
                                field.value
                                  ? new Date(field.value).getHours().toString()
                                  : "9"
                              }
                              onValueChange={(hour) => {
                                const currentDate = field.value
                                  ? new Date(field.value)
                                  : new Date();
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
                                    {i.toString().padStart(2, "0")}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Select
                              value={
                                field.value
                                  ? new Date(field.value)
                                      .getMinutes()
                                      .toString()
                                  : "0"
                              }
                              onValueChange={(minute) => {
                                const currentDate = field.value
                                  ? new Date(field.value)
                                  : new Date();
                                currentDate.setMinutes(parseInt(minute));
                                field.onChange(currentDate);
                              }}
                            >
                              <SelectTrigger className="w-20">
                                <SelectValue placeholder="Dakika" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from(
                                  { length: 4 },
                                  (_, i) => i * 15
                                ).map((minute) => (
                                  <SelectItem
                                    key={minute}
                                    value={minute.toString()}
                                  >
                                    {minute.toString().padStart(2, "0")}
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
            name="employeeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Personel</FormLabel>
                <Select
                  onValueChange={(val) => field.onChange(val)}
                  defaultValue={
                    field.value !== undefined ? String(field.value) : undefined
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Bir personel seçiniz" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {employees.map((val) => {
                      return (
                        <SelectItem value={val.id}>
                          {val.name} {val.surname}
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Açıklama</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="material"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kullanılan Malzeme</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="materialBrand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kullanılan Malzeme Markası</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="supplierId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tedarikçi</FormLabel>
                <Select
                  onValueChange={(val) => field.onChange(val)}
                  defaultValue={
                    field.value !== undefined ? String(field.value) : undefined
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Bir tedarikçi seçiniz" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {suppliers.map((val) => {
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
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>İndirim</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tutar</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
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
