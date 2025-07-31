import z from "zod";

export const accountTransactionFormSchema = z.object({
  id: z.string().optional(),
  customerId: z.string(),
  accountOwnerType: z.number(),
  claim: z.number(),
  transactionDate: z.date(),
  description: z.string().optional(),
});
