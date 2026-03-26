import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AssetFileTypeSchema } from '../enums/AssetFileType.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  documentUrl: z.string(),
  assetFileType: AssetFileTypeSchema.optional(),
  labId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const CaseAssetFileCreateManyDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseAssetFileCreateManyDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCreateManyDentalCaseInput>;
export const CaseAssetFileCreateManyDentalCaseInputObjectZodSchema = makeSchema();
