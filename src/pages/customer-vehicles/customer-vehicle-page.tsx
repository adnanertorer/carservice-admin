import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { GenericService } from "@/core/services/GenericService";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ColumnFilterInput } from "@/components/table-filter";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TableHeaders } from "@/components/table-header";
import { Pagination } from "@/components/pagination";
import { useParams } from "react-router-dom";
import type { CustomerVehicleModel } from "@/features/customer-vehicles/models/customer-vehicle-model";
import { vehicleColumns } from "@/features/customer-vehicles/components/vehicle-columns";
import { CreateVehicleDrawer } from "@/features/customer-vehicles/components/create-vehicle-drawer";

export function CustomerVehiclePage() {
  const data: CustomerVehicleModel[] = [];
  const [sorting, setSorting] = useState<SortingState>([]);
  const [vehicles, setVehicles] = useState<CustomerVehicleModel[]>(data);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const { customerId } = useParams<{ customerId: string }>();

  const vehicleService = useMemo(
    () => new GenericService<CustomerVehicleModel>("vehicle"),
    []
  );

  const fetchVehicles = useCallback(async () => {
    const response = await vehicleService.getByFilter(
      customerId,
      "customerId",
      0,
      50,
      "",
      false
    );
    if (
      response.succeeded &&
      response.data?.items &&
      response.data?.items.length > 0
    ) {
      setVehicles(response.data?.items);
    }
  }, [customerId, vehicleService]);

  const columns = useMemo(
    () => vehicleColumns(vehicleService, fetchVehicles),
    [vehicleService, fetchVehicles]
  );

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const table = useReactTable<CustomerVehicleModel>({
    data: vehicles,
    columns: columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
        columnKey="brand"
        placeholder="Filter brands..."
      />
      <div className="rounded-md border">
        <div className="p-2">
            <CreateVehicleDrawer onVehicleCreated={fetchVehicles} />
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
                  colSpan={columns.length}
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
