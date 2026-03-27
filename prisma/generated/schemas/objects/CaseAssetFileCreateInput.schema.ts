import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AssetFileTypeSchema } from '../enums/AssetFileType.schema';
import { CaseCreateNestedOneWithoutCaseAssetFilesInputObjectSchema as CaseCreateNestedOneWithoutCaseAssetFilesInputObjectSchema } from './CaseCreateNestedOneWithoutCaseAssetFilesInput.schema';
import { LabCreateNestedOneWithoutCaseAssetFilesInputObjectSchema as LabCreateNestedOneWithoutCaseAssetFilesInputObjectSchema } from './LabCreateNestedOneWithoutCaseAssetFilesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  documentUrl: z.string(),
  assetFileType: AssetFileTypeSchema.optional(),
  createdAt: z.coerce.date().optional(),
  dentalCase: z.lazy(() => CaseCreateNestedOneWithoutCaseAssetFilesInputObjectSchema),
  lab: z.lazy(() => LabCreateNestedOneWithoutCaseAssetFilesInputObjectSchema)
}).strict();
export const CaseAssetFileCreateInputObjectSchema: z.ZodType<Prisma.CaseAssetFileCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCreateInput>;
export const CaseAssetFileCreateInputObjectZodSchema = makeSchema();
