import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoicePaymentCreateManyInvoiceInputObjectSchema as InvoicePaymentCreateManyInvoiceInputObjectSchema } from './InvoicePaymentCreateManyInvoiceInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => InvoicePaymentCreateManyInvoiceInputObjectSchema), z.lazy(() => InvoicePaymentCreateManyInvoiceInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const InvoicePaymentCreateManyInvoiceInputEnvelopeObjectSchema: z.ZodType<Prisma.InvoicePaymentCreateManyInvoiceInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentCreateManyInvoiceInputEnvelope>;
export const InvoicePaymentCreateManyInvoiceInputEnvelopeObjectZodSchema = makeSchema();
