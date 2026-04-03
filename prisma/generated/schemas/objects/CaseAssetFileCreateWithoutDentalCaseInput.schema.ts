import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AssetFileTypeSchema } from '../enums/AssetFileType.schema';
import { LabCreateNestedOneWithoutCaseAssetFilesInputObjectSchema as LabCreateNestedOneWithoutCaseAssetFilesInputObjectSchema } from './LabCreateNestedOneWithoutCaseAssetFilesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  documentUrl: z.string(),
  assetFileType: AssetFileTypeSchema.optional(),
  fileExtension: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutCaseAssetFilesInputObjectSchema)
}).strict();
export const CaseAssetFileCreateWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseAssetFileCreateWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCreateWithoutDentalCaseInput>;
export const CaseAssetFileCreateWithoutDentalCaseInputObjectZodSchema = makeSchema();
