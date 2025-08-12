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
import type { IApproveBookingProps } from "../props/approve-booking-props";
import { approveBookingSchema } from "../schemas/approve-booking-schema";
import type { ApproveBookingModel } from "../models/approve-booking-model";

export function ApproveBookingForm({
  className,
  onSubmit,
  bookingModel,
  ...props
}: IApproveBookingProps & Omit<React.ComponentProps<"div">, "onSubmit">) {

  const form = useForm<z.infer<typeof approveBookingSchema>>({
    resolver: zodResolver(approveBookingSchema),
    defaultValues: {
      bookingId: bookingModel.id,
      status: 1,
      companyMessage: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form.getValues() as ApproveBookingModel);
  };

    // Format booking date
  const bookingDateValue = bookingModel.bookingDate;
  const bookingDateObj = new Date(bookingDateValue);
  
  const formattedBookingDate = bookingDateObj.toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <h2 className="text-2xl font-bold">
       {bookingModel.mobileUser?.name} {bookingModel.mobileUser?.surname} Randevu Onay Formu
      </h2>
      <p>{formattedBookingDate}</p>
      <p>{bookingModel.vehicleBrand} {bookingModel.vehicleModel}</p>
      <p>{bookingModel.description}</p>
      <Form {...form}>
        <form className="space-y-8" method="PUT" onSubmit={handleSubmit}>
          <input type="hidden" {...form.register("bookingId")} />
          <FormField
            control={form.control}
            name="companyMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mesajınızı buraya yazabilirsiniz</FormLabel>
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
