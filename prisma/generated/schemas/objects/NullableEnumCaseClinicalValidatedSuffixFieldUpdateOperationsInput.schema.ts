import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalValidatedSuffixSchema } from '../enums/CaseClinicalValidatedSuffix.schema'

const makeSchema = () => z.object({
  set: CaseClinicalValidatedSuffixSchema.optional()
}).strict();
export const NullableEnumCaseClinicalValidatedSuffixFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableEnumCaseClinicalValidatedSuffixFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableEnumCaseClinicalValidatedSuffixFieldUpdateOperationsInput>;
export const NullableEnumCaseClinicalValidatedSuffixFieldUpdateOperationsInputObjectZodSchema = makeSchema();
