import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SupportedLanguageSchema } from '../enums/SupportedLanguage.schema'

const makeSchema = () => z.object({
  set: SupportedLanguageSchema.optional()
}).strict();
export const EnumSupportedLanguageFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumSupportedLanguageFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumSupportedLanguageFieldUpdateOperationsInput>;
export const EnumSupportedLanguageFieldUpdateOperationsInputObjectZodSchema = makeSchema();
