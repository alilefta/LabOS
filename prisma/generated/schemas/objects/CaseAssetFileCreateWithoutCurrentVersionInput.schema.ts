import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AssetFileTypeSchema } from '../enums/AssetFileType.schema';
import { CaseAssetStorageModeSchema } from '../enums/CaseAssetStorageMode.schema';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema';
import { CaseCreateNestedOneWithoutCaseAssetFilesInputObjectSchema as CaseCreateNestedOneWithoutCaseAssetFilesInputObjectSchema } from './CaseCreateNestedOneWithoutCaseAssetFilesInput.schema';
import { LabCreateNestedOneWithoutCaseAssetFilesInputObjectSchema as LabCreateNestedOneWithoutCaseAssetFilesInputObjectSchema } from './LabCreateNestedOneWithoutCaseAssetFilesInput.schema';
import { CaseAssetFileVersionCreateNestedManyWithoutAssetInputObjectSchema as CaseAssetFileVersionCreateNestedManyWithoutAssetInputObjectSchema } from './CaseAssetFileVersionCreateNestedManyWithoutAssetInput.schema'

const makeSchema = () => z.object({
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  documentUrl: z.string().optional().nullable(),
  assetFileType: AssetFileTypeSchema.optional(),
  fileExtension: z.string().optional().nullable(),
  storageMode: CaseAssetStorageModeSchema.optional(),
  clinicalPurpose: CaseClinicalPurposeSchema.optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dentalCase: z.lazy(() => CaseCreateNestedOneWithoutCaseAssetFilesInputObjectSchema),
  lab: z.lazy(() => LabCreateNestedOneWithoutCaseAssetFilesInputObjectSchema),
  versions: z.lazy(() => CaseAssetFileVersionCreateNestedManyWithoutAssetInputObjectSchema).optional()
}).strict();
export const CaseAssetFileCreateWithoutCurrentVersionInputObjectSchema: z.ZodType<Prisma.CaseAssetFileCreateWithoutCurrentVersionInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCreateWithoutCurrentVersionInput>;
export const CaseAssetFileCreateWithoutCurrentVersionInputObjectZodSchema = makeSchema();
