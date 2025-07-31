export type AccountTransactionModel = {
  id?: string;
  companyId: string;
  accountOwnerId: string;
  transactionType: number;
  customerId: string;
  accountOwnerType: number;
  claim: number;
  debt: number;
  balance: number;
  ownerName: string;
  transactionDate: Date;
  description?: string;
};
