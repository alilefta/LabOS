import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { InvoiceStatusSchema } from '../enums/InvoiceStatus.schema';
import { ClinicCreateNestedOneWithoutInvoicesInputObjectSchema as ClinicCreateNestedOneWithoutInvoicesInputObjectSchema } from './ClinicCreateNestedOneWithoutInvoicesInput.schema';
import { InvoiceCaseCreateNestedManyWithoutInvoiceInputObjectSchema as InvoiceCaseCreateNestedManyWithoutInvoiceInputObjectSchema } from './InvoiceCaseCreateNestedManyWithoutInvoiceInput.schema';
import { InvoicePaymentCreateNestedManyWithoutInvoiceInputObjectSchema as InvoicePaymentCreateNestedManyWithoutInvoiceInputObjectSchema } from './InvoicePaymentCreateNestedManyWithoutInvoiceInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
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
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  clinic: z.lazy(() => ClinicCreateNestedOneWithoutInvoicesInputObjectSchema),
  cases: z.lazy(() => InvoiceCaseCreateNestedManyWithoutInvoiceInputObjectSchema).optional(),
  payments: z.lazy(() => InvoicePaymentCreateNestedManyWithoutInvoiceInputObjectSchema).optional()
}).strict();
export const InvoiceCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.InvoiceCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCreateWithoutLabInput>;
export const InvoiceCreateWithoutLabInputObjectZodSchema = makeSchema();
