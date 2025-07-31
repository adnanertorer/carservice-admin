import type { CreateClaimModel } from "../models/create-claim-model";

export interface ICreateTransactionProps {
  onSubmit: (model: CreateClaimModel) => void;
  customerId: string; 
}