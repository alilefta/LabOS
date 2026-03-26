import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AssetFileTypeSchema } from '../enums/AssetFileType.schema';
import { CaseCreateNestedOneWithoutCaseAssetFilesInputObjectSchema as CaseCreateNestedOneWithoutCaseAssetFilesInputObjectSchema } from './CaseCreateNestedOneWithoutCaseAssetFilesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  documentUrl: z.string(),
  assetFileType: AssetFileTypeSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dentalCase: z.lazy(() => CaseCreateNestedOneWithoutCaseAssetFilesInputObjectSchema)
}).strict();
export const CaseAssetFileCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseAssetFileCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCreateWithoutLabInput>;
export const CaseAssetFileCreateWithoutLabInputObjectZodSchema = makeSchema();
