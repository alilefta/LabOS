import * as z from "zod";
import { InvoiceStatusSchema } from "./enums.base";
export const InvoiceBaseSchema = z.object({
	id: z.string(),
	labId: z.string(),
	clinicId: z.string(),
	invoiceNumber: z.string(),
	status: InvoiceStatusSchema,
	notes: z.string().nullable(),
	subtotal: z.number(),
	discountAmount: z.number(),
	total: z.number(),
	amountPaid: z.number(),
	amountDue: z.number(),
	issuedAt: z.date().nullable(),
	dueDate: z.date().nullable(),
	publicToken: z.string().nullable(),
	publicLinkExpiresAt: z.date().nullable(),

	createdAt: z.date(),
	updatedAt: z.date(),
});

export type InvoiceBase = z.infer<typeof InvoiceBaseSchema>;
