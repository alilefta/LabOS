import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema as DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { EnumPaymentMethodWithAggregatesFilterObjectSchema as EnumPaymentMethodWithAggregatesFilterObjectSchema } from './EnumPaymentMethodWithAggregatesFilter.schema';
import { PaymentMethodSchema } from '../enums/PaymentMethod.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const invoicepaymentscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => InvoicePaymentScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => InvoicePaymentScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => InvoicePaymentScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => InvoicePaymentScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => InvoicePaymentScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  invoiceId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  amount: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amount' must be a Decimal",
})]).optional(),
  method: z.union([z.lazy(() => EnumPaymentMethodWithAggregatesFilterObjectSchema), PaymentMethodSchema]).optional(),
  reference: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  paidAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const InvoicePaymentScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.InvoicePaymentScalarWhereWithAggregatesInput> = invoicepaymentscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.InvoicePaymentScalarWhereWithAggregatesInput>;
export const InvoicePaymentScalarWhereWithAggregatesInputObjectZodSchema = invoicepaymentscalarwherewithaggregatesinputSchema;
