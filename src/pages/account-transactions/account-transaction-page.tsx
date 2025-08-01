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
import type { AccountTransactionModel } from "@/features/account-transactions/models/account-transaction-model";
import { TransactionColumns } from "@/features/account-transactions/components/transaction-columns";
import { FilterForm } from "@/features/account-transactions/components/filter-form";
import type { TransactionTotal } from "@/features/account-transactions/models/transaction-total";
import api from "@/core/api/axios";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";
import type { MainResponse } from "@/core/api/responses/PaginatedResponse";

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

  const transactionService = React.useMemo(
    () => new GenericService<AccountTransactionModel>("accounttransaction"),
    []
  );

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
        console.log("Totals response:", res.data);
        setTotals(res.data.data);
        transactionsByFilter(customerId, startDate, endDate);
      })
      .catch((error) => {
        console.error("Error fetching totals:", error);
      });
  };

  const transactionsByFilter = (
    customerId?: string,
    startDate?: string,
    endDate?: string
  ) => {
    const params = new URLSearchParams();
    if (customerId) params.append("customerId", customerId);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    params.append("pageSize", "50");
    params.append("pageIndex", "0");
    params.append("IsAllItems", "false");

    api
      .get<MainResponse<AccountTransactionModel>>(
        `/accounttransaction/list?${params.toString()}`
      )
      .then((res) => {
        if (res.data.succeeded && res.data.data?.items) {
          setTransactions(res.data.data?.items);
        }
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  };

  const fetchTransactions = React.useCallback(async () => {
    const res = await transactionService.getByFilter(
      undefined,
      undefined,
      0,
      50,
      "",
      false
    );
    if (res.succeeded && res.data?.items) {
      setTransactions(res.data?.items);
    }
  }, [transactionService]);

  const transactionColumns = React.useMemo(() => TransactionColumns(), []);

  React.useEffect(() => {
    fetchTransactions();
    getTotals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchTransactions]);

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
          console.log(values);
          getTotals(
            values.customerId ?? undefined,
            values.startDate ?? undefined,
            values.endDate ?? undefined
          );
        }}
      />
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
      <Pagination table={table} />
      <div className="p-4 border-b ml-4 mr-4" style={{ float: "right" }}>
            <p style={{ fontSize: "small" }}>
              Toplam Borç: {totals?.totalDebt}
            </p>
            <p style={{ fontSize: "small" }}>
              Toplam Alacak: {totals?.totalClaim}
            </p>
            <p style={{ fontSize: "small" }}>
              Net: {totals?.total}
            </p>
          </div>
    </div>
  );
}
