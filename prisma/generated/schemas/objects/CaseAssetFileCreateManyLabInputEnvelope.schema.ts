import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileCreateManyLabInputObjectSchema as CaseAssetFileCreateManyLabInputObjectSchema } from './CaseAssetFileCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseAssetFileCreateManyLabInputObjectSchema), z.lazy(() => CaseAssetFileCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseAssetFileCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseAssetFileCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCreateManyLabInputEnvelope>;
export const CaseAssetFileCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
