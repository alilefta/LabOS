import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SupportedCurrencySchema } from '../enums/SupportedCurrency.schema'

const makeSchema = () => z.object({
  set: SupportedCurrencySchema.optional()
}).strict();
export const EnumSupportedCurrencyFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumSupportedCurrencyFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumSupportedCurrencyFieldUpdateOperationsInput>;
export const EnumSupportedCurrencyFieldUpdateOperationsInputObjectZodSchema = makeSchema();
