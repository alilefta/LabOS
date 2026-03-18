import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeCreateManyCaseCategoryInputObjectSchema as WorkTypeCreateManyCaseCategoryInputObjectSchema } from './WorkTypeCreateManyCaseCategoryInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => WorkTypeCreateManyCaseCategoryInputObjectSchema), z.lazy(() => WorkTypeCreateManyCaseCategoryInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const WorkTypeCreateManyCaseCategoryInputEnvelopeObjectSchema: z.ZodType<Prisma.WorkTypeCreateManyCaseCategoryInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCreateManyCaseCategoryInputEnvelope>;
export const WorkTypeCreateManyCaseCategoryInputEnvelopeObjectZodSchema = makeSchema();
