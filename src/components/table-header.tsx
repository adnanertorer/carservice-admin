import {
  flexRender,
  type Table,
} from "@tanstack/react-table";
import { TableHeader, TableRow, TableCell } from "@/components/ui/table";

interface TableHeadersProps<T> {
  table: Table<T>;
}

export function TableHeaders<T>({ table }: TableHeadersProps<T>) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableCell key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}
