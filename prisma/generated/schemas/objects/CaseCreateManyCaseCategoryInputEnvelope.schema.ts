import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateManyCaseCategoryInputObjectSchema as CaseCreateManyCaseCategoryInputObjectSchema } from './CaseCreateManyCaseCategoryInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseCreateManyCaseCategoryInputObjectSchema), z.lazy(() => CaseCreateManyCaseCategoryInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseCreateManyCaseCategoryInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseCreateManyCaseCategoryInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateManyCaseCategoryInputEnvelope>;
export const CaseCreateManyCaseCategoryInputEnvelopeObjectZodSchema = makeSchema();
