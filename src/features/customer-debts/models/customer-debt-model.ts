import type { AccountTransactionModel } from "@/features/account-transactions/models/account-transaction-model";

export type CustomerDebtModel = {
    customerId: string;
    customerName: string;
    customerSurname: string;
    balance: number;
    transactions: AccountTransactionModel[];
}