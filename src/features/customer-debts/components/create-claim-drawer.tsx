"use client";

import { CreateDrawer } from "@/components/create-drawer";
import type { CreateClaimModel } from "@/features/account-transactions/models/create-claim-model";
import { CreateClaimForm } from "../forms/create-claim-transaction-form";

interface CreateClaimDrawerProps {
  onClaimCreated: () => Promise<void>;
  customerId?: string;
  customerName?: string;
  customerSurname?: string;
  accountOwnerType?: number;
  balance?: number;
}

export const CreateClaimDrawer: React.FC<CreateClaimDrawerProps> = ({
  onClaimCreated,
  customerId,
  customerName,
  customerSurname,
  accountOwnerType,
  balance,
}) => {
  return (
    <CreateDrawer<CreateClaimModel>
      endpoint="accounttransaction"
      title="Yeni Tahsilat"
      triggerText="Ödeme Al"
      onCreated={onClaimCreated}
      renderForm={(handleSubmit) => (
        <CreateClaimForm
          onSubmit={handleSubmit}
          customerId={customerId || ""}
          customerName={customerName || ""}
          customerSurname={customerSurname || ""}
          accountOwnerType={accountOwnerType || 0}
          balance={balance || 0}
          onCreatedClaim={onClaimCreated}
        />
      )}
    />
  );
};
