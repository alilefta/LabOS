import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AssetFileTypeSchema } from '../enums/AssetFileType.schema'

const makeSchema = () => z.object({
  set: AssetFileTypeSchema.optional()
}).strict();
export const EnumAssetFileTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumAssetFileTypeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumAssetFileTypeFieldUpdateOperationsInput>;
export const EnumAssetFileTypeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
