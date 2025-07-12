"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const customerFormSchema = z.object({
    name: z.string().min(2, {
      message: "İsim alanı en az 2 karakter olmalıdır.",
    }),
    surname: z.string().min(2, {
        message: "Soyisim alanı en az 2 karakter olmalı"
    }),
    email: z.string().min(5, {
        message: 'Lütfn geçerli bir email yazınız'
    }),
    phone: z.string().min(10, {
        message: 'En az 10 karakterden oluşur'
    }).max(16,{
        message: 'En fazla 16 karakterden oluşur'
    }),
    address: z.string().min(10, {
        message: 'En az 10 karakterden oluşmalı'
    })
  })

export function CreateCustomerForm({
    className,
    ...props
}: React.ComponentProps<'div'>){

    const form = useForm<z.infer<typeof customerFormSchema>>({
        resolver: zodResolver(customerFormSchema),
        defaultValues: {
          name: '',
          surname: '',
          email: '',
          phone: '',
          address: ''
        },
      })

      function onSubmit(values: z.infer<typeof customerFormSchema>) {
        console.log(values)
      }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adı</FormLabel>
                  <FormControl>
                    <Input placeholder="adı" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
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
                    <Input placeholder="soyadı" {...field} />
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
                    <Input type="email" placeholder="eposta" {...field} />
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
                    <Input type="tel" placeholder="telefon" {...field} />
                  </FormControl>
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
                    <Input type="text" placeholder="Adres" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        </div>
    )
}