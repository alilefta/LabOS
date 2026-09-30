import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalValidatedSuffixSchema } from '../enums/CaseClinicalValidatedSuffix.schema'

const makeSchema = () => z.object({
  set: CaseClinicalValidatedSuffixSchema.optional()
}).strict();
export const EnumCaseClinicalValidatedSuffixFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumCaseClinicalValidatedSuffixFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseClinicalValidatedSuffixFieldUpdateOperationsInput>;
export const EnumCaseClinicalValidatedSuffixFieldUpdateOperationsInputObjectZodSchema = makeSchema();
