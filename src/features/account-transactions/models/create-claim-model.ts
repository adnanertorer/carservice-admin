export type CreateClaimModel = {
    customerId: string;
    accountOwnerType: number;
    claim: number;
    transactionDate: Date;
    description?: string;
}