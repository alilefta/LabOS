import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { AssetFileTypeSchema } from '../enums/AssetFileType.schema';
import { EnumAssetFileTypeFieldUpdateOperationsInputObjectSchema as EnumAssetFileTypeFieldUpdateOperationsInputObjectSchema } from './EnumAssetFileTypeFieldUpdateOperationsInput.schema';
import { CaseAssetStorageModeSchema } from '../enums/CaseAssetStorageMode.schema';
import { EnumCaseAssetStorageModeFieldUpdateOperationsInputObjectSchema as EnumCaseAssetStorageModeFieldUpdateOperationsInputObjectSchema } from './EnumCaseAssetStorageModeFieldUpdateOperationsInput.schema';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema';
import { NullableEnumCaseClinicalPurposeFieldUpdateOperationsInputObjectSchema as NullableEnumCaseClinicalPurposeFieldUpdateOperationsInputObjectSchema } from './NullableEnumCaseClinicalPurposeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LabUpdateOneRequiredWithoutCaseAssetFilesNestedInputObjectSchema as LabUpdateOneRequiredWithoutCaseAssetFilesNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutCaseAssetFilesNestedInput.schema';
import { CaseAssetFileVersionUpdateManyWithoutAssetNestedInputObjectSchema as CaseAssetFileVersionUpdateManyWithoutAssetNestedInputObjectSchema } from './CaseAssetFileVersionUpdateManyWithoutAssetNestedInput.schema';
import { CaseAssetFileVersionUpdateOneWithoutCurrentForAssetNestedInputObjectSchema as CaseAssetFileVersionUpdateOneWithoutCurrentForAssetNestedInputObjectSchema } from './CaseAssetFileVersionUpdateOneWithoutCurrentForAssetNestedInput.schema'

const makeSchema = () => z.object({
  title: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  documentUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  assetFileType: z.union([AssetFileTypeSchema, z.lazy(() => EnumAssetFileTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  fileExtension: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  storageMode: z.union([CaseAssetStorageModeSchema, z.lazy(() => EnumCaseAssetStorageModeFieldUpdateOperationsInputObjectSchema)]).optional(),
  clinicalPurpose: z.union([CaseClinicalPurposeSchema, z.lazy(() => NullableEnumCaseClinicalPurposeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutCaseAssetFilesNestedInputObjectSchema).optional(),
  versions: z.lazy(() => CaseAssetFileVersionUpdateManyWithoutAssetNestedInputObjectSchema).optional(),
  currentVersion: z.lazy(() => CaseAssetFileVersionUpdateOneWithoutCurrentForAssetNestedInputObjectSchema).optional()
}).strict();
export const CaseAssetFileUpdateWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUpdateWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUpdateWithoutDentalCaseInput>;
export const CaseAssetFileUpdateWithoutDentalCaseInputObjectZodSchema = makeSchema();
