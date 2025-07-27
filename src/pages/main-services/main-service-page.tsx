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
import { TableHeaders } from "@/components/table-header";
import { Pagination } from "@/components/pagination";
import type { MainServiceModel } from "@/features/main-services/models/main-service-model";
import { MainServiceColumns } from "@/features/main-services/components/main-service-columns";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ConfirmDialogShadCn } from "@/core/components/dialogs/alert-dialog";
import { toast } from "react-toastify";

export function MainServicePage() {
  const navigate = useNavigate();
  const data: MainServiceModel[] = [];

  //table column fonksiyonellikleri
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  //main service verileri
  const [mainservices, setMainServices] = useState<MainServiceModel[]>(data);
  //main service api servisi
  const mainService = React.useMemo(
    () => new GenericService<MainServiceModel>("mainservice"),
    []
  );

  //satırlardan gelen secili kayitı silmek için
  const [selectedForDelete, setSelectedForDelete] =
    useState<MainServiceModel | null>(null);
  //confirm dialog
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, [selectedForDelete]);

  const closeDialog = () => {
    setSelectedForDelete(null);
    setOpen(false);
  };

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
    () =>
      MainServiceColumns( navigate, (item) => {
        setSelectedForDelete(item);
      }),
    [navigate]
  );
  

  useEffect(() => {
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
      <div className="rounded-md border">
        <div className="p-2"></div>
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
      {selectedForDelete && (
        <ConfirmDialogShadCn
          open={open}
          title={`${selectedForDelete.vehicle?.plate} ${selectedForDelete.vehicle?.brand} ${selectedForDelete.vehicle?.model} Servis Kartı Silme`}
          description={`Bu servisi silmek istediğinize emin misiniz?`}
          actionText="Evet"
          cancelText="Hayır"
          onCancel={closeDialog}
          onConfirm={async () => {
            const response = await mainService.remove(selectedForDelete.id);
            if (response.succeeded) {
              toast.success("Kayıt silindi!");
              await fetchMainServices();
            } else {
              toast.error(
                response.errors?.[0] ?? "Silme sırasında hata oluştu."
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
