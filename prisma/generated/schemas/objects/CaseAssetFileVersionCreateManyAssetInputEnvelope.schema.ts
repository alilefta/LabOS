import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionCreateManyAssetInputObjectSchema as CaseAssetFileVersionCreateManyAssetInputObjectSchema } from './CaseAssetFileVersionCreateManyAssetInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseAssetFileVersionCreateManyAssetInputObjectSchema), z.lazy(() => CaseAssetFileVersionCreateManyAssetInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseAssetFileVersionCreateManyAssetInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionCreateManyAssetInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionCreateManyAssetInputEnvelope>;
export const CaseAssetFileVersionCreateManyAssetInputEnvelopeObjectZodSchema = makeSchema();
