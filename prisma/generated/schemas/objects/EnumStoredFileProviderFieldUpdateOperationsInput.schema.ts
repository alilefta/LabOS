import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema'

const makeSchema = () => z.object({
  set: StoredFileProviderSchema.optional()
}).strict();
export const EnumStoredFileProviderFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumStoredFileProviderFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumStoredFileProviderFieldUpdateOperationsInput>;
export const EnumStoredFileProviderFieldUpdateOperationsInputObjectZodSchema = makeSchema();
