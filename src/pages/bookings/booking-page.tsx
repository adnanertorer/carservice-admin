import { GenericPagination } from "@/components/generic-pagination";
import { TableHeaders } from "@/components/table-header";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import api from "@/core/api/axios";
import type {
  MainResponse,
  PaginatedResponse,
} from "@/core/api/responses/PaginatedResponse";
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_OPTIONS,
} from "@/core/consts/consts";
import { BookingCard } from "@/features/booking/components/booking-card";
import { BookingColumns } from "@/features/booking/components/booking-columns";
import type { BookingModel } from "@/features/booking/models/booking-model";
import { usePagination } from "@/hooks/use-pagination";
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
import { useCallback, useEffect, useMemo, useState } from "react";

export function BookingPage() {
  const data: BookingModel[] = [];

  const [bookings, setBookings] = useState<BookingModel[]>(data);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  //pagination islemleri
  const [paginationData, setPaginationData] =
    useState<PaginatedResponse<BookingModel> | null>(null);
  const { currentPage, pageSize, handlePageChange, handlePageSizeChange } =
    usePagination(DEFAULT_PAGE_SIZE);

  const bookingByFilter = useCallback(
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

      const response = await api.get<MainResponse<BookingModel>>(
        `/booking/get-by-company?${params.toString()}`
      );
      if (response.data.succeeded && response.data.data?.items) {
        setBookings(response.data.data?.items);
        setPaginationData(response.data.data);
      }
    },
    []
  );

  const onPageChange = (page: number) => {
    handlePageChange(page);
    bookingByFilter(page, pageSize, "", false);
  };

  const onPageSizeChange = (newPageSize: number) => {
    handlePageSizeChange(newPageSize);
    bookingByFilter(currentPage, newPageSize, "", false);
  };

  const fetchBookings = useCallback(async () => {
    bookingByFilter(currentPage, pageSize, "", false);
  }, [bookingByFilter, currentPage, pageSize]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings, currentPage, pageSize]);

  const bookingColumns = useMemo(() => BookingColumns(), []);

  const table = useReactTable<BookingModel>({
    data: bookings,
    columns: bookingColumns,
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
      <h3>Müşteri Randevu İstekleri</h3>
      <hr />
      <div className="hidden md:block rounded-md border mt-4">
      <Table style={{ marginTop: "20px" }}>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={bookingColumns.length}
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
                <h3 style={{ padding: "10px" }}>Randevu İstekleri</h3>
                {bookings.length > 0 ? (
                  <div className="space-y-3">
                    {bookings.map((booking) => (
                      <BookingCard
                        onApproveUpdate={fetchBookings}
                        key={booking.id}
                        booking={booking}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Kayıt bulunamadı.
                  </div>
                )}
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
    </div>
  );
}
