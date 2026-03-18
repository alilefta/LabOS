import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileCreateManyCaseInputObjectSchema as CaseAssetFileCreateManyCaseInputObjectSchema } from './CaseAssetFileCreateManyCaseInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseAssetFileCreateManyCaseInputObjectSchema), z.lazy(() => CaseAssetFileCreateManyCaseInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseAssetFileCreateManyCaseInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseAssetFileCreateManyCaseInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCreateManyCaseInputEnvelope>;
export const CaseAssetFileCreateManyCaseInputEnvelopeObjectZodSchema = makeSchema();
