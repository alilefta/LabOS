import z from "zod";
import { InvoiceBaseSchema } from "../base/invoice.base";
import { LabBaseSchema } from "../base/lab.base";
import { ClinicBaseSchema } from "../base/clinic.base";
import { CaseBaseSchema } from "../base/case.base";
import { InvoicePaymentBaseSchema } from "../base/invoice-payment.base";

export const InvoiceDetailsSchema = InvoiceBaseSchema.extend({
	lab: LabBaseSchema,
	clinic: ClinicBaseSchema,
	cases: z.array(CaseBaseSchema),
	payments: z.array(InvoicePaymentBaseSchema),
});

export type InvoiceDetails = z.infer<typeof InvoiceDetailsSchema>;

export const InvoiceDetailsUISchema = InvoiceBaseSchema.extend({
	lab: LabBaseSchema.nullable(),
	clinic: ClinicBaseSchema.nullable(),
	cases: z.array(CaseBaseSchema).nullable(),
	payments: z.array(InvoicePaymentBaseSchema).nullable(),
});

export type InvoiceDetailsUI = z.infer<typeof InvoiceDetailsUISchema>;
