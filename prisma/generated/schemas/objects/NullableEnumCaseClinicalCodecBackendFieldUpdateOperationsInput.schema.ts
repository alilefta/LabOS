import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalCodecBackendSchema } from '../enums/CaseClinicalCodecBackend.schema'

const makeSchema = () => z.object({
  set: CaseClinicalCodecBackendSchema.optional()
}).strict();
export const NullableEnumCaseClinicalCodecBackendFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableEnumCaseClinicalCodecBackendFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableEnumCaseClinicalCodecBackendFieldUpdateOperationsInput>;
export const NullableEnumCaseClinicalCodecBackendFieldUpdateOperationsInputObjectZodSchema = makeSchema();
