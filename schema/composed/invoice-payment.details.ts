import z from "zod";
import { InvoicePaymentBaseSchema } from "../base/invoice-payment.base";
import { InvoiceBaseSchema } from "../base/invoice.base";
import { LabBaseSchema } from "../base/lab.base";

export const InvoicePaymentDetailsSchema = InvoicePaymentBaseSchema.extend({
	invoice: InvoiceBaseSchema,
	lab: LabBaseSchema,
});

export type InvoicePaymentDetails = z.infer<typeof InvoicePaymentDetailsSchema>;

export const InvoicePaymentDetailsUISchema = InvoicePaymentBaseSchema.extend({
	invoice: InvoiceBaseSchema.nullable(),
	lab: LabBaseSchema.nullable(),
});

export type InvoicePaymentDetailsUI = z.infer<typeof InvoicePaymentDetailsUISchema>;
