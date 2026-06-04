import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumInvoiceStatusFilterObjectSchema as EnumInvoiceStatusFilterObjectSchema } from './EnumInvoiceStatusFilter.schema';
import { InvoiceStatusSchema } from '../enums/InvoiceStatus.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DecimalNullableFilterObjectSchema as DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const invoicescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => InvoiceScalarWhereInputObjectSchema), z.lazy(() => InvoiceScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => InvoiceScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => InvoiceScalarWhereInputObjectSchema), z.lazy(() => InvoiceScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  clinicId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  invoiceNumber: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => EnumInvoiceStatusFilterObjectSchema), InvoiceStatusSchema]).optional(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  subtotal: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'subtotal' must be a Decimal",
})]).optional(),
  discountAmount: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'discountAmount' must be a Decimal",
})]).optional(),
  appliedDiscountPercentage: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'appliedDiscountPercentage' must be a Decimal",
})]).optional().nullable(),
  discountReason: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  total: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'total' must be a Decimal",
})]).optional(),
  amountPaid: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amountPaid' must be a Decimal",
})]).optional(),
  amountDue: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amountDue' must be a Decimal",
})]).optional(),
  issuedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  dueDate: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  publicToken: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  publicLinkExpiresAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  isActive: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const InvoiceScalarWhereInputObjectSchema: z.ZodType<Prisma.InvoiceScalarWhereInput> = invoicescalarwhereinputSchema as unknown as z.ZodType<Prisma.InvoiceScalarWhereInput>;
export const InvoiceScalarWhereInputObjectZodSchema = invoicescalarwhereinputSchema;
