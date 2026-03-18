import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { AssetFileTypeSchema } from '../enums/AssetFileType.schema';
import { EnumAssetFileTypeFieldUpdateOperationsInputObjectSchema as EnumAssetFileTypeFieldUpdateOperationsInputObjectSchema } from './EnumAssetFileTypeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CaseUpdateOneRequiredWithoutCaseAssetFilesNestedInputObjectSchema as CaseUpdateOneRequiredWithoutCaseAssetFilesNestedInputObjectSchema } from './CaseUpdateOneRequiredWithoutCaseAssetFilesNestedInput.schema';
import { LabUpdateOneRequiredWithoutCaseAssetFilesNestedInputObjectSchema as LabUpdateOneRequiredWithoutCaseAssetFilesNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutCaseAssetFilesNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  documentUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  assetFileType: z.union([AssetFileTypeSchema, z.lazy(() => EnumAssetFileTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  case: z.lazy(() => CaseUpdateOneRequiredWithoutCaseAssetFilesNestedInputObjectSchema).optional(),
  Lab: z.lazy(() => LabUpdateOneRequiredWithoutCaseAssetFilesNestedInputObjectSchema).optional()
}).strict();
export const CaseAssetFileUpdateInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUpdateInput>;
export const CaseAssetFileUpdateInputObjectZodSchema = makeSchema();
