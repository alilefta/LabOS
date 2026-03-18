import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientCreateManyLabInputObjectSchema as PatientCreateManyLabInputObjectSchema } from './PatientCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => PatientCreateManyLabInputObjectSchema), z.lazy(() => PatientCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const PatientCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.PatientCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PatientCreateManyLabInputEnvelope>;
export const PatientCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
