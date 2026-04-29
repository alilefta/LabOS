import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { PaymentMethodSchema } from '../enums/PaymentMethod.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  labId: z.string(),
  amount: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amount' must be a Decimal",
}),
  method: PaymentMethodSchema,
  reference: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  paidAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();
export const InvoicePaymentCreateManyInvoiceInputObjectSchema: z.ZodType<Prisma.InvoicePaymentCreateManyInvoiceInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentCreateManyInvoiceInput>;
export const InvoicePaymentCreateManyInvoiceInputObjectZodSchema = makeSchema();
