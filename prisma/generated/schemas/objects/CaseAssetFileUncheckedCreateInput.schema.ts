import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AssetFileTypeSchema } from '../enums/AssetFileType.schema';
import { CaseAssetStorageModeSchema } from '../enums/CaseAssetStorageMode.schema';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema';
import { CaseAssetFileVersionUncheckedCreateNestedManyWithoutAssetInputObjectSchema as CaseAssetFileVersionUncheckedCreateNestedManyWithoutAssetInputObjectSchema } from './CaseAssetFileVersionUncheckedCreateNestedManyWithoutAssetInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  dentalCaseId: z.string(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  documentUrl: z.string().optional().nullable(),
  assetFileType: AssetFileTypeSchema.optional(),
  fileExtension: z.string().optional().nullable(),
  labId: z.string(),
  storageMode: CaseAssetStorageModeSchema.optional(),
  clinicalPurpose: CaseClinicalPurposeSchema.optional().nullable(),
  currentVersionId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  versions: z.lazy(() => CaseAssetFileVersionUncheckedCreateNestedManyWithoutAssetInputObjectSchema).optional()
}).strict();
export const CaseAssetFileUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUncheckedCreateInput>;
export const CaseAssetFileUncheckedCreateInputObjectZodSchema = makeSchema();
