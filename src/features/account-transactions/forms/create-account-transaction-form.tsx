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
import type { ICreateTransactionProps } from "../props/create-accounttransaction-props";
import { GenericService } from "@/core/services/GenericService";
import { useEffect, useState, useMemo } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { accountTransactionFormSchema } from "../schemas/account-transaction-schema";
import type { CustomerModel } from "@/features/customers/models/CustomerModel";
import type { CreateClaimModel } from "../models/create-claim-model";

export function CreateTransactionForm({
  className,
  onSubmit,
  customerId,
  ...props
}: ICreateTransactionProps & Omit<React.ComponentProps<"div">, "onSubmit">) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<CustomerModel | null>(null);

  const form = useForm<z.infer<typeof accountTransactionFormSchema>>({
    resolver: zodResolver(accountTransactionFormSchema),
    defaultValues: {
      id: "",
      customerId: customerId,
      accountOwnerType: 1,
      claim: 0,
      transactionDate: new Date(),
      description: "",
    },
  });

const customerService = useMemo(() => new GenericService<CustomerModel>("customer"), []);

  useEffect(() => {
    const fetchCustomer = async () => {
      const response = await customerService.getById(customerId);
      if(response.succeeded){
        setCustomer(response.data ?? null)
      }
     }
     fetchCustomer();
  }, [customerId, customerService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form.getValues() as CreateClaimModel);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <h2 className="text-2xl font-bold">
        {customer?.name} {customer?.surname} Tahsilat Oluştur
      </h2>
      <Form {...form}>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <FormField
            control={form.control}
            name="claim"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alacak Miktarı</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="transactionDate"
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
          <Button type="submit">Kaydet</Button>
        </form>
      </Form>
    </div>
  );
}
