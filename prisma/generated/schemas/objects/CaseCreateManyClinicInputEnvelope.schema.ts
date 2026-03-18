import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateManyClinicInputObjectSchema as CaseCreateManyClinicInputObjectSchema } from './CaseCreateManyClinicInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseCreateManyClinicInputObjectSchema), z.lazy(() => CaseCreateManyClinicInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseCreateManyClinicInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseCreateManyClinicInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateManyClinicInputEnvelope>;
export const CaseCreateManyClinicInputEnvelopeObjectZodSchema = makeSchema();
