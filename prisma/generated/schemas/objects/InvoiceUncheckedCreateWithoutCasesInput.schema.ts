import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { InvoiceStatusSchema } from '../enums/InvoiceStatus.schema';
import { InvoicePaymentUncheckedCreateNestedManyWithoutInvoiceInputObjectSchema as InvoicePaymentUncheckedCreateNestedManyWithoutInvoiceInputObjectSchema } from './InvoicePaymentUncheckedCreateNestedManyWithoutInvoiceInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  labId: z.string(),
  clinicId: z.string(),
  invoiceNumber: z.string(),
  status: InvoiceStatusSchema.optional(),
  notes: z.string().optional().nullable(),
  subtotal: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'subtotal' must be a Decimal",
}),
  discountAmount: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'discountAmount' must be a Decimal",
}).optional(),
  appliedDiscountPercentage: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'appliedDiscountPercentage' must be a Decimal",
}).optional().nullable(),
  discountReason: z.string().optional().nullable(),
  total: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'total' must be a Decimal",
}),
  amountPaid: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amountPaid' must be a Decimal",
}).optional(),
  amountDue: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amountDue' must be a Decimal",
}),
  issuedAt: z.coerce.date().optional().nullable(),
  dueDate: z.coerce.date().optional().nullable(),
  publicToken: z.string().optional().nullable(),
  publicLinkExpiresAt: z.coerce.date().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  payments: z.lazy(() => InvoicePaymentUncheckedCreateNestedManyWithoutInvoiceInputObjectSchema).optional()
}).strict();
export const InvoiceUncheckedCreateWithoutCasesInputObjectSchema: z.ZodType<Prisma.InvoiceUncheckedCreateWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceUncheckedCreateWithoutCasesInput>;
export const InvoiceUncheckedCreateWithoutCasesInputObjectZodSchema = makeSchema();
