import z from "zod";
import { PaymentMethodSchema } from "./enums.base";

export const InvoicePaymentBaseSchema = z.object({
	id: z.string(),
	invoiceId: z.string(),
	labId: z.string(),
	amount: z.number(),
	method: PaymentMethodSchema,
	reference: z.string().nullable(),
	notes: z.string().nullable(),
	paidAt: z.date(),
	createdAt: z.date(),
});

export type InvoicePaymentBase = z.infer<typeof InvoicePaymentBaseSchema>;
