import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { AssetFileTypeSchema } from '../enums/AssetFileType.schema';
import { EnumAssetFileTypeFieldUpdateOperationsInputObjectSchema as EnumAssetFileTypeFieldUpdateOperationsInputObjectSchema } from './EnumAssetFileTypeFieldUpdateOperationsInput.schema';
import { CaseAssetStorageModeSchema } from '../enums/CaseAssetStorageMode.schema';
import { EnumCaseAssetStorageModeFieldUpdateOperationsInputObjectSchema as EnumCaseAssetStorageModeFieldUpdateOperationsInputObjectSchema } from './EnumCaseAssetStorageModeFieldUpdateOperationsInput.schema';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema';
import { NullableEnumCaseClinicalPurposeFieldUpdateOperationsInputObjectSchema as NullableEnumCaseClinicalPurposeFieldUpdateOperationsInputObjectSchema } from './NullableEnumCaseClinicalPurposeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  dentalCaseId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  documentUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  assetFileType: z.union([AssetFileTypeSchema, z.lazy(() => EnumAssetFileTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  fileExtension: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  labId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  storageMode: z.union([CaseAssetStorageModeSchema, z.lazy(() => EnumCaseAssetStorageModeFieldUpdateOperationsInputObjectSchema)]).optional(),
  clinicalPurpose: z.union([CaseClinicalPurposeSchema, z.lazy(() => NullableEnumCaseClinicalPurposeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  currentVersionId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const CaseAssetFileUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUncheckedUpdateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUncheckedUpdateManyInput>;
export const CaseAssetFileUncheckedUpdateManyInputObjectZodSchema = makeSchema();
