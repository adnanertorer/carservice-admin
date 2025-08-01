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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import type { CustomerBasicInfoModel } from "@/features/customers/models/customer-basic-info-model";
import api from "@/core/api/axios";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";

const filterFormSchema = z.object({
  customerId: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

interface FilterFormProps {
  onFilter: (values: {
    customerId?: string | null;
    startDate?: string | null;
    endDate?: string | null;
  }) => void;
  className?: string;
}

type FilterValues = {
  customerId?: string;
  startDate?: string;
  endDate?: string;
};

export function FilterForm({ onFilter, className }: FilterFormProps) {
  const data: CustomerBasicInfoModel[] = [];
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [customers, setCustomers] = useState<CustomerBasicInfoModel[]>(data);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await api.get<ISingleResponse<CustomerBasicInfoModel[]>>(
        "/customer/basic-infos"
      );
      if (response.data?.succeeded && response.data?.data) {
        setCustomers(response.data.data);
      }
    };
    fetchCustomers();
  }, []);

  const form = useForm<z.infer<typeof filterFormSchema>>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      customerId: "all",
      startDate: undefined,
      endDate: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof filterFormSchema>) {
    const formattedValues = {
      customerId:
        values.customerId && values.customerId !== "all"
          ? values.customerId
          : undefined,
      startDate: values.startDate ? values.startDate.toISOString() : undefined,
      endDate: values.endDate ? values.endDate.toISOString() : undefined,
    };

    // degerler icinde null ya da undefined varsa kaldır gitsin
    const currentValues: FilterValues = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(formattedValues).filter(([_, v]) => v !== undefined)
    ) as FilterValues;

    onFilter(
      currentValues as {
        customerId?: string;
        startDate?: string;
        endDate?: string;
      }
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cari Hesap</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(val) => field.onChange(val)}
                    defaultValue={
                      field.value !== undefined
                        ? String(field.value)
                        : undefined
                    }
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Bir cari hesap seçiniz" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">Tüm Cariler</SelectItem>
                      {customers.map((val) => (
                        <SelectItem key={val.id} value={val.id.toString()}>
                          {val.fullName}
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
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Başlangıç Tarihi</FormLabel>
                  <FormControl>
                    <Popover
                      open={startDateOpen}
                      onOpenChange={setStartDateOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between font-normal"
                        >
                          {field.value
                            ? new Date(field.value).toLocaleDateString("tr-TR")
                            : "Başlangıç tarihi seçiniz"}
                          <ChevronDownIcon className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            field.onChange(date);
                            setStartDateOpen(false);
                          }}
                          captionLayout="dropdown"
                          fromYear={2020}
                          toYear={2030}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bitiş Tarihi</FormLabel>
                  <FormControl>
                    <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between font-normal"
                        >
                          {field.value
                            ? new Date(field.value).toLocaleDateString("tr-TR")
                            : "Bitiş tarihi seçiniz"}
                          <ChevronDownIcon className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            field.onChange(date);
                            setEndDateOpen(false);
                          }}
                          captionLayout="dropdown"
                          fromYear={2020}
                          toYear={2030}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button type="submit" className="w-full h-[42px] mt-1">
                Filtrele
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-full h-[42px]"
                onClick={() => {
                  form.reset({
                    customerId: "all",
                    startDate: undefined,
                    endDate: undefined,
                  });
                  onFilter({});
                }}
              >
                Temizle
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
