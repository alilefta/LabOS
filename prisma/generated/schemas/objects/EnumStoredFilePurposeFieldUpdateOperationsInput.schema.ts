import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFilePurposeSchema } from '../enums/StoredFilePurpose.schema'

const makeSchema = () => z.object({
  set: StoredFilePurposeSchema.optional()
}).strict();
export const EnumStoredFilePurposeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumStoredFilePurposeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumStoredFilePurposeFieldUpdateOperationsInput>;
export const EnumStoredFilePurposeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
