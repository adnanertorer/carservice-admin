import { Input } from "@/components/ui/input";
import type { Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

interface ColumnFilterInputProps<T> {
  table: Table<T>;
  columnKey: string;
  placeholder?: string;
  className?: string;
}

export function ColumnFilterInput<T>({
  table,
  columnKey,
  placeholder = "Filter...",
  className = "max-w-sm",
}: ColumnFilterInputProps<T>) {
  const column = table.getColumn(columnKey);

  return (
    <div className="flex items-center py-4">
      <Input
        placeholder={placeholder}
        value={(column?.getFilterValue() as string) ?? ""}
        onChange={(e) => column?.setFilterValue(e.target.value)}
        className={className}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
