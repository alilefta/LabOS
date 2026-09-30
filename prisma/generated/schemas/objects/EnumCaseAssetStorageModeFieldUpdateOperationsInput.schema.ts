import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetStorageModeSchema } from '../enums/CaseAssetStorageMode.schema'

const makeSchema = () => z.object({
  set: CaseAssetStorageModeSchema.optional()
}).strict();
export const EnumCaseAssetStorageModeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumCaseAssetStorageModeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseAssetStorageModeFieldUpdateOperationsInput>;
export const EnumCaseAssetStorageModeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
