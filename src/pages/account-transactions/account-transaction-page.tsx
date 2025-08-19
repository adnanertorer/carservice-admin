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
import { TableHeaders } from "@/components/table-header";
import type { AccountTransactionModel } from "@/features/account-transactions/models/account-transaction-model";
import { TransactionColumns } from "@/features/account-transactions/components/transaction-columns";
import { FilterForm } from "@/features/account-transactions/components/filter-form";
import { TransactionCard } from "@/features/account-transactions/components/transaction-card";
import type { TransactionTotal } from "@/features/account-transactions/models/transaction-total";
import api from "@/core/api/axios";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";
import type { MainResponse, PaginatedResponse } from "@/core/api/responses/PaginatedResponse";
import { GenericPagination } from "@/components/generic-pagination";
import { usePagination } from "@/hooks/use-pagination";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "@/core/consts/consts";

export function AccountTransactionPage() {
  const data: AccountTransactionModel[] = [];
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [transactions, setTransactions] =
    React.useState<AccountTransactionModel[]>(data);
  const [totals, setTotals] = React.useState<TransactionTotal>();

  //pagination islemleri
  const [paginationData, setPaginationData] = React.useState<PaginatedResponse<AccountTransactionModel> | null>(null);
  const { currentPage, pageSize, handlePageChange, handlePageSizeChange } = usePagination(DEFAULT_PAGE_SIZE);

  const getTotals = (
    customerId?: string,
    startDate?: string,
    endDate?: string
  ) => {
    const params = new URLSearchParams();

    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    if (customerId) params.append("customerId", customerId);

    api
      .get<ISingleResponse<TransactionTotal>>(
        `/accounttransaction/get-totals?${params.toString()}`
      )
      .then((res) => {
        setTotals(res.data.data);
        transactionsByFilter(customerId, startDate, endDate, currentPage, pageSize);
      })
      .catch((error) => {
        console.error("Error fetching totals:", error);
      });
  };

  const transactionsByFilter = React.useCallback((
    customerId?: string,
    startDate?: string,
    endDate?: string,
    page: number = currentPage,
    size: number = pageSize
  ) => {
    const params = new URLSearchParams();
    if (customerId) params.append("customerId", customerId);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    params.append("pageSize", size.toString());
    params.append("pageIndex", page.toString());
    params.append("IsAllItems", "false");

    api
      .get<MainResponse<AccountTransactionModel>>(
        `/accounttransaction/list?${params.toString()}`
      )
      .then((res) => {
        if (res.data.succeeded && res.data.data?.items) {
          setPaginationData(res.data.data);
          setTransactions(res.data.data?.items);
        }
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, [currentPage, pageSize]);

  const fetchTransactions = React.useCallback(() => {
    transactionsByFilter(undefined, undefined, undefined, currentPage, pageSize);
  }, [currentPage, pageSize, transactionsByFilter]);

  const onPageChange = (page: number) => {
    handlePageChange(page);
    transactionsByFilter(undefined, undefined, undefined, page, pageSize);
  };

  const onPageSizeChange = (newPageSize: number) => {
    handlePageSizeChange(newPageSize);
    transactionsByFilter(undefined, undefined, undefined, 0, newPageSize);
  };

  const transactionColumns = React.useMemo(() => TransactionColumns(), []);

  React.useEffect(() => {
    fetchTransactions();
    getTotals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchTransactions, currentPage, pageSize]);

  const table = useReactTable<AccountTransactionModel>({
    data: transactions,
    columns: transactionColumns,
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
      <FilterForm
        onFilter={(values) => {
          handlePageChange(0);
          getTotals(
            values.customerId ?? undefined,
            values.startDate ?? undefined,
            values.endDate ?? undefined
          );
        }}
      />
      
      {/* Desktop Tablo Görünümü */}
      <div className="hidden md:block rounded-md border mt-4">
        <h3 style={{ padding: "10px" }}>Cari Hareketler</h3>
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
                  colSpan={transactionColumns.length}
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
        <h3 style={{ padding: "10px" }}>Cari Hareketler</h3>
        {transactions.length > 0 ? (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <TransactionCard 
                key={transaction.id} 
                transaction={transaction} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Kayıt bulunamadı.
          </div>
        )}
      </div>
      
      {/* Pagination ve Toplamlar */}
      <div className="mt-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="order-2 lg:order-1">
          <div className="text-sm space-y-1">
            <p>Toplam Borç: {totals?.totalDebt}</p>
            <p>Toplam Alacak: {totals?.totalClaim}</p>
            <p>Net: {totals?.total}</p>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 w-full lg:w-auto">
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
            <div className="text-sm text-gray-500">Sayfalama verisi yükleniyor...</div>
          )}
          
        </div>
      </div>
    </div>
  );
}
