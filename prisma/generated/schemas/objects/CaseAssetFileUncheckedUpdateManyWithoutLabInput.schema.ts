import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { AssetFileTypeSchema } from '../enums/AssetFileType.schema';
import { EnumAssetFileTypeFieldUpdateOperationsInputObjectSchema as EnumAssetFileTypeFieldUpdateOperationsInputObjectSchema } from './EnumAssetFileTypeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  dentalCaseId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  documentUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  assetFileType: z.union([AssetFileTypeSchema, z.lazy(() => EnumAssetFileTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  fileExtension: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const CaseAssetFileUncheckedUpdateManyWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUncheckedUpdateManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUncheckedUpdateManyWithoutLabInput>;
export const CaseAssetFileUncheckedUpdateManyWithoutLabInputObjectZodSchema = makeSchema();
