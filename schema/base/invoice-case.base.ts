import * as z from "zod";

export const InvoiceCaseBaseSchema = z.object({
	invoiceId: z.string(),
	caseId: z.string(),
	caseTotal: z.number(),
	labId: z.string(),
});

export type InvoiceCaseBase = z.infer<typeof InvoiceCaseBaseSchema>;
