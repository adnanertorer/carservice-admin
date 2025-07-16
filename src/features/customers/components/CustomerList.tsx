"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { columns } from "./columns";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { GenericService } from "@/core/services/GenericService";
import { CreateCustomerDrawer } from "./create-drawer";
import type { CustomerModel } from "../models/CustomerModel";
import { ColumnFilterInput } from "@/components/table-filter";
import { TableHeaders } from "@/components/table-header";
import { Pagination } from "@/components/pagination";
import { useNavigate } from "react-router-dom";

export function CustomerList() {
const navigate = useNavigate();
  const data: CustomerModel[] = [];
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [customers, setCustomers] = React.useState<CustomerModel[]>(data);
  const customerService = React.useMemo(
    () => new GenericService<CustomerModel>("customer"),
    []
  );

  const fetchCustomers = React.useCallback(async () => {
    const res = await customerService.getByFilter(
      undefined,
      undefined,
      0,
      50,
      "",
      false
    );
    if (res.succeeded && res.data?.items && res.data?.items.length > 0) {
      setCustomers(res.data?.items);
    }
  }, [customerService]);

  const customerColumns = React.useMemo(
    () => columns(customerService, fetchCustomers, navigate),
    [customerService, fetchCustomers, navigate]
  );

  React.useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const table = useReactTable<CustomerModel>({
    data: customers,
    columns: customerColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <ColumnFilterInput
        table={table}
        columnKey="email"
        placeholder="Filter email..."
      />
      <div className="rounded-md border">
        <div className="p-2">
          <CreateCustomerDrawer onCustomerCreated={fetchCustomers} />
        </div>
        <Table>
        <TableHeaders table={table} />
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={customerColumns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        </Table>
      </div>
      <Pagination table={table} />
    </div>
  );
}
