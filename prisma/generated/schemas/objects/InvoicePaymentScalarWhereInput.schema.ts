import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { EnumPaymentMethodFilterObjectSchema as EnumPaymentMethodFilterObjectSchema } from './EnumPaymentMethodFilter.schema';
import { PaymentMethodSchema } from '../enums/PaymentMethod.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const invoicepaymentscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => InvoicePaymentScalarWhereInputObjectSchema), z.lazy(() => InvoicePaymentScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => InvoicePaymentScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => InvoicePaymentScalarWhereInputObjectSchema), z.lazy(() => InvoicePaymentScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  invoiceId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  amount: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amount' must be a Decimal",
})]).optional(),
  method: z.union([z.lazy(() => EnumPaymentMethodFilterObjectSchema), PaymentMethodSchema]).optional(),
  reference: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  paidAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const InvoicePaymentScalarWhereInputObjectSchema: z.ZodType<Prisma.InvoicePaymentScalarWhereInput> = invoicepaymentscalarwhereinputSchema as unknown as z.ZodType<Prisma.InvoicePaymentScalarWhereInput>;
export const InvoicePaymentScalarWhereInputObjectZodSchema = invoicepaymentscalarwhereinputSchema;
