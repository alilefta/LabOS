import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCreateManyLabInputObjectSchema as InvoiceCreateManyLabInputObjectSchema } from './InvoiceCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => InvoiceCreateManyLabInputObjectSchema), z.lazy(() => InvoiceCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const InvoiceCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.InvoiceCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCreateManyLabInputEnvelope>;
export const InvoiceCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
