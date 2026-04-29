import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoicePaymentCreateManyLabInputObjectSchema as InvoicePaymentCreateManyLabInputObjectSchema } from './InvoicePaymentCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => InvoicePaymentCreateManyLabInputObjectSchema), z.lazy(() => InvoicePaymentCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const InvoicePaymentCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.InvoicePaymentCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentCreateManyLabInputEnvelope>;
export const InvoicePaymentCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
