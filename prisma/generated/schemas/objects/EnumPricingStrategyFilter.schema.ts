import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PricingStrategySchema } from '../enums/PricingStrategy.schema';
import { NestedEnumPricingStrategyFilterObjectSchema as NestedEnumPricingStrategyFilterObjectSchema } from './NestedEnumPricingStrategyFilter.schema'

const makeSchema = () => z.object({
  equals: PricingStrategySchema.optional(),
  in: PricingStrategySchema.array().optional(),
  notIn: PricingStrategySchema.array().optional(),
  not: z.union([PricingStrategySchema, z.lazy(() => NestedEnumPricingStrategyFilterObjectSchema)]).optional()
}).strict();
export const EnumPricingStrategyFilterObjectSchema: z.ZodType<Prisma.EnumPricingStrategyFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumPricingStrategyFilter>;
export const EnumPricingStrategyFilterObjectZodSchema = makeSchema();
