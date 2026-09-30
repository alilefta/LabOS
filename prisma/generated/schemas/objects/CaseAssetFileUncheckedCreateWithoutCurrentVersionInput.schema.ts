import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AssetFileTypeSchema } from '../enums/AssetFileType.schema';
import { CaseAssetStorageModeSchema } from '../enums/CaseAssetStorageMode.schema';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema';
import { CaseAssetFileVersionUncheckedCreateNestedManyWithoutAssetInputObjectSchema as CaseAssetFileVersionUncheckedCreateNestedManyWithoutAssetInputObjectSchema } from './CaseAssetFileVersionUncheckedCreateNestedManyWithoutAssetInput.schema'

const makeSchema = () => z.object({
  dentalCaseId: z.string(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  documentUrl: z.string().optional().nullable(),
  assetFileType: AssetFileTypeSchema.optional(),
  fileExtension: z.string().optional().nullable(),
  storageMode: CaseAssetStorageModeSchema.optional(),
  clinicalPurpose: CaseClinicalPurposeSchema.optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  versions: z.lazy(() => CaseAssetFileVersionUncheckedCreateNestedManyWithoutAssetInputObjectSchema).optional()
}).strict();
export const CaseAssetFileUncheckedCreateWithoutCurrentVersionInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUncheckedCreateWithoutCurrentVersionInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUncheckedCreateWithoutCurrentVersionInput>;
export const CaseAssetFileUncheckedCreateWithoutCurrentVersionInputObjectZodSchema = makeSchema();
