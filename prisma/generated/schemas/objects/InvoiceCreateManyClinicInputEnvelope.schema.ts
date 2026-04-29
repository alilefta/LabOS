import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCreateManyClinicInputObjectSchema as InvoiceCreateManyClinicInputObjectSchema } from './InvoiceCreateManyClinicInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => InvoiceCreateManyClinicInputObjectSchema), z.lazy(() => InvoiceCreateManyClinicInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const InvoiceCreateManyClinicInputEnvelopeObjectSchema: z.ZodType<Prisma.InvoiceCreateManyClinicInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCreateManyClinicInputEnvelope>;
export const InvoiceCreateManyClinicInputEnvelopeObjectZodSchema = makeSchema();
