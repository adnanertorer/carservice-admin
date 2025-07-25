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

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { GenericService } from "@/core/services/GenericService";
import { ColumnFilterInput } from "@/components/table-filter";
import { TableHeaders } from "@/components/table-header";
import { Pagination } from "@/components/pagination";
import type { MainServiceModel } from "@/features/main-services/models/main-service-model";
import { MainServiceColumns } from "@/features/main-services/components/main-service-columns";

export function MainServicePage() {
  const data: MainServiceModel[] = [];
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [mainservices, setMainServices] = React.useState<MainServiceModel[]>(data);
  const mainService = React.useMemo(
    () => new GenericService<MainServiceModel>("mainservice"),
    []
  );

  const fetchMainServices = React.useCallback(async () => {
    const res = await mainService.getByFilter(
      undefined,
      undefined,
      0,
      50,
      "",
      false
    );
    if (res.succeeded && res.data?.items) {
      setMainServices(res.data?.items);
    }
  }, [mainService]);

  const mainServiceColumns = React.useMemo(
    () => MainServiceColumns(mainService, fetchMainServices),
    [mainService, fetchMainServices]
  );

  React.useEffect(() => {
    fetchMainServices();
  }, [fetchMainServices]);

  const table = useReactTable<MainServiceModel>({
    data: mainservices,
    columns: mainServiceColumns,
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
                colSpan={mainServiceColumns.length}
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
