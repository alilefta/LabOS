import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalVerifiedFormatSchema } from '../enums/CaseClinicalVerifiedFormat.schema'

const makeSchema = () => z.object({
  set: CaseClinicalVerifiedFormatSchema.optional()
}).strict();
export const EnumCaseClinicalVerifiedFormatFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumCaseClinicalVerifiedFormatFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseClinicalVerifiedFormatFieldUpdateOperationsInput>;
export const EnumCaseClinicalVerifiedFormatFieldUpdateOperationsInputObjectZodSchema = makeSchema();
