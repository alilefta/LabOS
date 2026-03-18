import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AssetFileTypeSchema } from '../enums/AssetFileType.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  caseId: z.string(),
  title: z.string(),
  description: z.string(),
  documentUrl: z.string(),
  assetFileType: AssetFileTypeSchema.optional(),
  labId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const CaseAssetFileCreateManyInputObjectSchema: z.ZodType<Prisma.CaseAssetFileCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCreateManyInput>;
export const CaseAssetFileCreateManyInputObjectZodSchema = makeSchema();
