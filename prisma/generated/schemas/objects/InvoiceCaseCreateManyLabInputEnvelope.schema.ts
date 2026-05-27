import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseCreateManyLabInputObjectSchema as InvoiceCaseCreateManyLabInputObjectSchema } from './InvoiceCaseCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => InvoiceCaseCreateManyLabInputObjectSchema), z.lazy(() => InvoiceCaseCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const InvoiceCaseCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.InvoiceCaseCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseCreateManyLabInputEnvelope>;
export const InvoiceCaseCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
