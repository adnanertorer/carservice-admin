import { TableHeaders } from "@/components/table-header";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import api from "@/core/api/axios";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";
import type { AccountTransactionModel } from "@/features/account-transactions/models/account-transaction-model";
import { CustomerBalanceInfoView } from "@/features/customer-debts/components/balance-info-view";
import { CustomerTransactionColumns } from "@/features/customer-debts/components/customer-transaction-columns";
import type { CustomerDebtModel } from "@/features/customer-debts/models/customer-debt-model";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

export function CustomerDebtPage() {
  const { id } = useParams<{ id: string }>();
  const data: AccountTransactionModel[] = [];

  const [transactions, setTransactions] =
    useState<AccountTransactionModel[]>(data);
  const [customerDebtInfo, setCustomerDebtInfo] =
    useState<CustomerDebtModel | null>(null);
    const [accountOwnerType, setAccountOwnerType] = useState<number>(0);

  const fetchCustomerDebt = useCallback(async () => {
    if (!id) return;
    try {
      const response = await api.get<ISingleResponse<CustomerDebtModel>>(
        `/accounttransaction/customer-balance?customerId=${id}`
      );
      if (response.data.data && response.data.succeeded) {
        setCustomerDebtInfo(response.data.data);
        setTransactions(response.data.data?.transactions || []);
        setAccountOwnerType(response.data.data?.transactions[0]?.accountOwnerType || 0);
      }
    } catch (error) {
      console.error("Error fetching customer debt:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchCustomerDebt();
  }, [fetchCustomerDebt]);

   const customerTransactionColumns = useMemo(
      () => CustomerTransactionColumns(),
      []
    );

  const table = useReactTable<AccountTransactionModel>({
    data: transactions,
    columns: customerTransactionColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {},
  });
  
  return (
    <div className="w-full">
      <CustomerBalanceInfoView style={{ marginBottom: "20px" }}
        balance={customerDebtInfo?.balance}
        customerId={customerDebtInfo?.customerId}
        customerName={customerDebtInfo?.customerName}
        customerSurname={customerDebtInfo?.customerSurname}
        key={customerDebtInfo?.customerId}
        accountOwnerType={accountOwnerType}
        onSubmitAfter={fetchCustomerDebt}
      />
      <hr />
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
                colSpan={customerTransactionColumns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
