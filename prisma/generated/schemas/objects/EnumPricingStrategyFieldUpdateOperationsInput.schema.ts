import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PricingStrategySchema } from '../enums/PricingStrategy.schema'

const makeSchema = () => z.object({
  set: PricingStrategySchema.optional()
}).strict();
export const EnumPricingStrategyFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumPricingStrategyFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumPricingStrategyFieldUpdateOperationsInput>;
export const EnumPricingStrategyFieldUpdateOperationsInputObjectZodSchema = makeSchema();
