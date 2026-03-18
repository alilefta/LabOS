import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryCreateManyLabInputObjectSchema as CaseCategoryCreateManyLabInputObjectSchema } from './CaseCategoryCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseCategoryCreateManyLabInputObjectSchema), z.lazy(() => CaseCategoryCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseCategoryCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseCategoryCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryCreateManyLabInputEnvelope>;
export const CaseCategoryCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
