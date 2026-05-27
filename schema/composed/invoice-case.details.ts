import * as z from "zod";
import { InvoiceCaseBaseSchema } from "../base/invoice-case.base";
import { InvoiceBaseSchema } from "../base/invoice.base";
import { CaseBaseSchema } from "../base/case.base";
import { LabBaseSchema } from "../base/lab.base";
export const InvoiceCaseDetailsSchema = InvoiceCaseBaseSchema.extend({
	invoice: InvoiceBaseSchema,
	case: CaseBaseSchema,
	lab: LabBaseSchema,
});

export type InvoiceCaseDetails = z.infer<typeof InvoiceCaseDetailsSchema>;

export const InvoiceCaseDetailsUISchema = InvoiceCaseBaseSchema.extend({
	invoice: InvoiceBaseSchema.nullable(),
	case: CaseBaseSchema.nullable(),
	lab: LabBaseSchema.nullable(),
});

export type InvoiceCaseDetailsUI = z.infer<typeof InvoiceCaseDetailsUISchema>;
