import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderAccessSchema } from '../enums/StoredFileProviderAccess.schema'

const makeSchema = () => z.object({
  set: StoredFileProviderAccessSchema.optional()
}).strict();
export const NullableEnumStoredFileProviderAccessFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableEnumStoredFileProviderAccessFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableEnumStoredFileProviderAccessFieldUpdateOperationsInput>;
export const NullableEnumStoredFileProviderAccessFieldUpdateOperationsInputObjectZodSchema = makeSchema();
