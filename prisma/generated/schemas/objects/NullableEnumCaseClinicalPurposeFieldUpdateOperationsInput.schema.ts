import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema'

const makeSchema = () => z.object({
  set: CaseClinicalPurposeSchema.optional()
}).strict();
export const NullableEnumCaseClinicalPurposeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableEnumCaseClinicalPurposeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableEnumCaseClinicalPurposeFieldUpdateOperationsInput>;
export const NullableEnumCaseClinicalPurposeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
