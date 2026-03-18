import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AssetFileTypeSchema } from '../enums/AssetFileType.schema';
import { LabCreateNestedOneWithoutCaseAssetFilesInputObjectSchema as LabCreateNestedOneWithoutCaseAssetFilesInputObjectSchema } from './LabCreateNestedOneWithoutCaseAssetFilesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  documentUrl: z.string(),
  assetFileType: AssetFileTypeSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Lab: z.lazy(() => LabCreateNestedOneWithoutCaseAssetFilesInputObjectSchema)
}).strict();
export const CaseAssetFileCreateWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseAssetFileCreateWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCreateWithoutCaseInput>;
export const CaseAssetFileCreateWithoutCaseInputObjectZodSchema = makeSchema();
