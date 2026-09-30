import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema'

const makeSchema = () => z.object({
  set: CaseClinicalPurposeSchema.optional()
}).strict();
export const EnumCaseClinicalPurposeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumCaseClinicalPurposeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseClinicalPurposeFieldUpdateOperationsInput>;
export const EnumCaseClinicalPurposeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
