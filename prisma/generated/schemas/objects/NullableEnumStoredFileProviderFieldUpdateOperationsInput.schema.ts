import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema'

const makeSchema = () => z.object({
  set: StoredFileProviderSchema.optional()
}).strict();
export const NullableEnumStoredFileProviderFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableEnumStoredFileProviderFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableEnumStoredFileProviderFieldUpdateOperationsInput>;
export const NullableEnumStoredFileProviderFieldUpdateOperationsInputObjectZodSchema = makeSchema();
