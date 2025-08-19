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
import type { MainServiceModel } from "@/features/main-services/models/main-service-model";
import { MainServiceColumns } from "@/features/main-services/components/main-service-columns";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { ConfirmDialogShadCn } from "@/core/components/dialogs/alert-dialog";
import { toast } from "react-toastify";
import type {
  MainResponse,
  PaginatedResponse,
} from "@/core/api/responses/PaginatedResponse";
import { usePagination } from "@/hooks/use-pagination";
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_OPTIONS,
} from "@/core/consts/consts";
import api from "@/core/api/axios";
import { GenericPagination } from "@/components/generic-pagination";

export function MainServicePage() {
  const navigate = useNavigate();
  const data: MainServiceModel[] = [];

  //table column fonksiyonellikleri
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  //pagination islemleri
  const [paginationData, setPaginationData] =
    useState<PaginatedResponse<MainServiceModel> | null>(null);
  const { currentPage, pageSize, handlePageChange, handlePageSizeChange } =
    usePagination(DEFAULT_PAGE_SIZE);

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

  const mainServiceByFilter = useCallback(
    async (
      pageNumber: number,
      pageSize: number,
      searchText: string,
      isAll: boolean
    ) => {
      const params = new URLSearchParams();

      params.append("pageSize", pageSize.toString());
      params.append("pageIndex", pageNumber.toString());
      params.append("IsAllItems", isAll.toString());
      params.append("search", searchText);

      const response = await api.get<MainResponse<MainServiceModel>>(
        `/mainservice/list?${params.toString()}`
      );
      if (response.data.succeeded && response.data.data?.items) {
        setMainServices(response.data.data?.items);
        setPaginationData(response.data.data);
      }
    },
    []
  );

  const fetchMainServices = React.useCallback(async () => {
    mainServiceByFilter(currentPage, pageSize, "", false);
  }, [mainServiceByFilter, currentPage, pageSize]);

  const onPageChange = (page: number) => {
    handlePageChange(page);
    mainServiceByFilter(page, pageSize, "", false);
  };

  const onPageSizeChange = (newPageSize: number) => {
    handlePageSizeChange(newPageSize);
    mainServiceByFilter(currentPage, newPageSize, "", false);
  };

  const mainServiceColumns = React.useMemo(
    () =>
      MainServiceColumns(navigate, fetchMainServices, (item) => {
        setSelectedForDelete(item);
      }),
    [fetchMainServices, navigate]
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
      <h3 style={{ padding: "10px" }}>Servisler</h3>
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
      <>
        <div className="order-1 lg:order-2 w-full lg:w-auto float-right">
          {paginationData ? (
            <GenericPagination
              data={paginationData}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
              pageSizeOptions={DEFAULT_PAGE_SIZE_OPTIONS}
              showPageSizeSelector={true}
              showInfo={true}
            />
          ) : (
            <div className="text-sm text-gray-500">
              Sayfalama verisi yükleniyor...
            </div>
          )}
        </div>
      </>
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
