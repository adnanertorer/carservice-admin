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
import { useNavigate } from "react-router-dom";
import type { CustomerModel } from "@/features/customers/models/CustomerModel";
import { CreateCustomerDrawer } from "@/features/customers/components/create-drawer";
import { columns } from "@/features/customers/components/columns";
import { ConfirmDialogShadCn } from "@/core/components/dialogs/alert-dialog";
import { toast } from "react-toastify";
import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  MainResponse,
  PaginatedResponse,
} from "@/core/api/responses/PaginatedResponse";
import { usePagination } from "@/hooks/use-pagination";
import api from "@/core/api/axios";
import { GenericPagination } from "@/components/generic-pagination";
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_OPTIONS,
} from "@/core/consts/consts";
import { CustomerCard } from "@/features/customers/components/customer-card";

export function CustomerPage() {
  const navigate = useNavigate();
  const data: CustomerModel[] = [];
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  //pagination islemleri
  const [paginationData, setPaginationData] =
    useState<PaginatedResponse<CustomerModel> | null>(null);
  const { currentPage, pageSize, handlePageChange, handlePageSizeChange } =
    usePagination(DEFAULT_PAGE_SIZE);

  //satırlardan gelen secili kayitı silmek için
  const [selectedForDelete, setSelectedForDelete] =
    useState<CustomerModel | null>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, [selectedForDelete]);

  const closeDialog = () => {
    setSelectedForDelete(null);
    setOpen(false);
  };

  const [customers, setCustomers] = React.useState<CustomerModel[]>(data);
  const customerService = React.useMemo(
    () => new GenericService<CustomerModel>("customer"),
    []
  );

  const customerByFilter = useCallback(
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

      const response = await api.get<MainResponse<CustomerModel>>(
        `/customer/list?${params.toString()}`
      );
      if (response.data.succeeded && response.data.data?.items) {
        setCustomers(response.data.data?.items);
        setPaginationData(response.data.data);
      }
    },
    []
  );

  const fetchCustomers = useCallback(async () => {
    customerByFilter(currentPage, pageSize, "", false);
  }, [currentPage, customerByFilter, pageSize]);

  const onPageChange = (page: number) => {
    handlePageChange(page);
    customerByFilter(page, pageSize, "", false);
  };

  const onPageSizeChange = (newPageSize: number) => {
    handlePageSizeChange(newPageSize);
    customerByFilter(currentPage, newPageSize, "", false);
  };

  const customerColumns = useMemo(
    () =>
      columns(fetchCustomers, navigate, (item) => {
        setSelectedForDelete(item);
      }),
    [fetchCustomers, navigate]
  );

  useEffect(() => {
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
      <h3 style={{ padding: "10px" }}>Müşteriler</h3>
      <ColumnFilterInput
        table={table}
        columnKey="email"
        placeholder="Filter email..."
      />
      <div className="rounded-md border">
        <div className="hidden md:block rounded-md border mt-4">
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

        {/* Mobil Card Görünümü */}
        <div className="md:hidden mt-4">
          <h3 style={{ padding: "10px" }}>Müşteriler</h3>
          {customers.length > 0 ? (
            <div className="space-y-3">
              {customers.map((customer) => (
                <CustomerCard
                  navigate={navigate}
                  onCustomerUpdated={fetchCustomers}
                  onDeleteRequest={(item) => {
                    setSelectedForDelete(item);
                  }}
                  key={customer.id}
                  customer={customer}
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
      <div className="mt-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
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
      </div>
      {selectedForDelete && (
        <ConfirmDialogShadCn
          open={open}
          title={`${selectedForDelete.name} ${selectedForDelete.surname} Müşteri Silme`}
          description={`Bu aracı silmek istediğinize emin misiniz?`}
          actionText="Evet"
          cancelText="Hayır"
          onCancel={closeDialog}
          onConfirm={async () => {
            const response = await customerService.remove(selectedForDelete.id);
            console.log("Kayıt silme yanıtı:", response);
            if (response.succeeded) {
              toast.success("Kayıt silindi!");
              fetchCustomers();
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
