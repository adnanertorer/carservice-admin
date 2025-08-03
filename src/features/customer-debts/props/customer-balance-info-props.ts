export interface CustomerBalanceInfoProps {
  customerId?: string;
  customerName?: string;
  customerSurname?: string;
  balance?: number;
  accountOwnerType?: number;
  onSubmitAfter: () => Promise<void>;
}