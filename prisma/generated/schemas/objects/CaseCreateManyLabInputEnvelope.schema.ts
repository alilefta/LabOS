import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateManyLabInputObjectSchema as CaseCreateManyLabInputObjectSchema } from './CaseCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseCreateManyLabInputObjectSchema), z.lazy(() => CaseCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateManyLabInputEnvelope>;
export const CaseCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
