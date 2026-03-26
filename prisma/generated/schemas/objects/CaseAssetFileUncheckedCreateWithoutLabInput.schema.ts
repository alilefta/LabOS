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
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const CaseAssetFileUncheckedCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUncheckedCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUncheckedCreateWithoutLabInput>;
export const CaseAssetFileUncheckedCreateWithoutLabInputObjectZodSchema = makeSchema();
