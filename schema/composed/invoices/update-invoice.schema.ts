// ── 2. MASTER SUBMISSION SCHEMA (Atomic Action Input) ──────────────────────

import z from "zod";
import { CreateInvoiceInputSchema } from "./new-invoice.schema";

// Extend the creation schema to require the invoiceId
export const UpdateInvoiceInputSchema = CreateInvoiceInputSchema.extend({
	invoiceId: z.uuid("Invalid Invoice ID format"),
});

export type UpdateInvoiceInput = z.infer<typeof UpdateInvoiceInputSchema>;
