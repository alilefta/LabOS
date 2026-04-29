import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { PaymentMethodSchema } from '../enums/PaymentMethod.schema';
import { LabCreateNestedOneWithoutInvoicePaymentsInputObjectSchema as LabCreateNestedOneWithoutInvoicePaymentsInputObjectSchema } from './LabCreateNestedOneWithoutInvoicePaymentsInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
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
  createdAt: z.coerce.date().optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutInvoicePaymentsInputObjectSchema)
}).strict();
export const InvoicePaymentCreateWithoutInvoiceInputObjectSchema: z.ZodType<Prisma.InvoicePaymentCreateWithoutInvoiceInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentCreateWithoutInvoiceInput>;
export const InvoicePaymentCreateWithoutInvoiceInputObjectZodSchema = makeSchema();
