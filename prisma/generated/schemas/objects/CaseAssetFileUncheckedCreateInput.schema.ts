import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AssetFileTypeSchema } from '../enums/AssetFileType.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  dentalCaseId: z.string(),
  title: z.string(),
  description: z.string(),
  documentUrl: z.string(),
  assetFileType: AssetFileTypeSchema.optional(),
  labId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();
export const CaseAssetFileUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUncheckedCreateInput>;
export const CaseAssetFileUncheckedCreateInputObjectZodSchema = makeSchema();
