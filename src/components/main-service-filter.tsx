import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";

type MainServiceFilterValues = {
    search?: string;
    startDate?: string;
    endDate?: string;
};

const mainFilterFormSchema = z.object({
    search: z.string().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
});

interface MainFilterFormProps {
    onFilter: (values: {
        search?: string | null;
        startDate?: string | null;
        endDate?: string | null;
    }) => void;
    className?: string;
}

export default function MainServiceFilter({ onFilter, className }: MainFilterFormProps) {
    const [startDateOpen, setStartDateOpen] = useState(false);
    const [endDateOpen, setEndDateOpen] = useState(false);

    const form = useForm<z.infer<typeof mainFilterFormSchema>>({
        resolver: zodResolver(mainFilterFormSchema),
        defaultValues: {
            search: undefined,
            startDate: undefined,
            endDate: undefined,
        },
    });

    function onSubmit(values: z.infer<typeof mainFilterFormSchema>) {
        const formattedValues = {
            search:
                values.search && values.search !== undefined
                    ? values.search
                    : undefined,
            startDate: values.startDate ? values.startDate.toISOString() : undefined,
            endDate: values.endDate ? values.endDate.toISOString() : undefined,
        };

        // degerler icinde null ya da undefined varsa kaldır gitsin
        const currentValues: MainServiceFilterValues = Object.fromEntries(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            Object.entries(formattedValues).filter(([_, v]) => v !== undefined)
        ) as MainServiceFilterValues;

        onFilter(
            currentValues as {
                search?: string;
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
                            name="search"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Plaka, marka veya model</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
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
                                        search: undefined,
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
    )
}