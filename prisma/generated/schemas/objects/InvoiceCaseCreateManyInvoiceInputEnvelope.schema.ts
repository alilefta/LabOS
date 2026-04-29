import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseCreateManyInvoiceInputObjectSchema as InvoiceCaseCreateManyInvoiceInputObjectSchema } from './InvoiceCaseCreateManyInvoiceInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => InvoiceCaseCreateManyInvoiceInputObjectSchema), z.lazy(() => InvoiceCaseCreateManyInvoiceInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const InvoiceCaseCreateManyInvoiceInputEnvelopeObjectSchema: z.ZodType<Prisma.InvoiceCaseCreateManyInvoiceInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseCreateManyInvoiceInputEnvelope>;
export const InvoiceCaseCreateManyInvoiceInputEnvelopeObjectZodSchema = makeSchema();
