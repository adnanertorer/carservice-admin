import z from "zod";

export const approveBookingSchema = z.object({
  bookingId: z.string().optional(),
  status: z.number(),
  companyMessage: z.string().optional(),
});
