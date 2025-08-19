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

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { GenericService } from "@/core/services/GenericService";
import { ColumnFilterInput } from "@/components/table-filter";
import { TableHeaders } from "@/components/table-header";
import { Pagination } from "@/components/pagination";
import type { SupplierModel } from "@/features/suppliers/models/supplier-model";
import { columns } from "@/features/suppliers/components/columns";
import { CreateSupplierDrawer } from "@/features/suppliers/components/create-drawer";
import { ConfirmDialogShadCn } from "@/core/components/dialogs/alert-dialog";
import { toast } from "react-toastify";
import { SupplierCard } from "@/features/suppliers/components/supplier-card";

export function SupplierPage() {
  const data: SupplierModel[] = [];
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [suppliers, setSuppliers] = React.useState<SupplierModel[]>(data);

  //satırlardan gelen secili kayitı silmek için
  const [selectedForDelete, setSelectedForDelete] =
    React.useState<SupplierModel | null>(null);

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(true);
  }, [selectedForDelete]);

  const closeDialog = () => {
    setSelectedForDelete(null);
    setOpen(false);
  };

  const supplierService = React.useMemo(
    () => new GenericService<SupplierModel>("supplier"),
    []
  );

  const fetchSuppliers = React.useCallback(async () => {
    const res = await supplierService.getByFilter(
      undefined,
      undefined,
      0,
      50,
      "",
      false
    );
    if (res.succeeded && res.data?.items) {
      setSuppliers(res.data?.items);
    }
  }, [supplierService]);

  const supplierColumns = React.useMemo(
    () =>
      columns(fetchSuppliers, (item) => {
        setSelectedForDelete(item);
      }),
    [fetchSuppliers]
  );

  React.useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  const table = useReactTable<SupplierModel>({
    data: suppliers,
    columns: supplierColumns,
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
      <h3 style={{ padding: "10px" }}>Tedarikçiler</h3>
      <ColumnFilterInput
        table={table}
        columnKey="email"
        placeholder="Filter email..."
      />
      <div className="rounded-md border">
        <div className="p-2">
          <CreateSupplierDrawer onSupplierCreated={fetchSuppliers} />
        </div>
        <div className="hidden md:block rounded-md border mt-4">
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
                    colSpan={supplierColumns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* Mobil Card Görünümü */}
        <div className="md:hidden mt-4">
          <h3 style={{ padding: "10px" }}>Tedarikçiler</h3>
          {suppliers.length > 0 ? (
            <div className="space-y-3">
              {suppliers.map((supplier) => (
                <SupplierCard
                  onSupplierUpdated={fetchSuppliers}
                  onDeleteRequest={(item) => {
                    setSelectedForDelete(item);
                    setOpen(true);
                  }}
                  key={supplier.id}
                  supplier={supplier}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Kayıt bulunamadı.
            </div>
          )}
        </div>
      </div>
      <Pagination table={table} />
      {selectedForDelete && (
        <ConfirmDialogShadCn
          open={open}
          title={`${selectedForDelete.name} Tedarikçi Silme`}
          description={`Bu tedarikçiyi silmek istediğinize emin misiniz?`}
          actionText="Evet"
          cancelText="Hayır"
          onCancel={closeDialog}
          onConfirm={async () => {
            const response = await supplierService.remove(selectedForDelete.id);
            if (response.succeeded) {
              toast.success("Kayıt silindi!");
              fetchSuppliers();
            } else {
              toast.error(
                response.errors?.[0] || "Kayıt silinirken bir hata oluştu!"
              );
            }
            setSelectedForDelete(null);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}
