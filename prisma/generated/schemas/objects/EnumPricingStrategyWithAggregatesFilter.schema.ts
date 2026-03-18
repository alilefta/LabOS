import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PricingStrategySchema } from '../enums/PricingStrategy.schema';
import { NestedEnumPricingStrategyWithAggregatesFilterObjectSchema as NestedEnumPricingStrategyWithAggregatesFilterObjectSchema } from './NestedEnumPricingStrategyWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumPricingStrategyFilterObjectSchema as NestedEnumPricingStrategyFilterObjectSchema } from './NestedEnumPricingStrategyFilter.schema'

const makeSchema = () => z.object({
  equals: PricingStrategySchema.optional(),
  in: PricingStrategySchema.array().optional(),
  notIn: PricingStrategySchema.array().optional(),
  not: z.union([PricingStrategySchema, z.lazy(() => NestedEnumPricingStrategyWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumPricingStrategyFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumPricingStrategyFilterObjectSchema).optional()
}).strict();
export const EnumPricingStrategyWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumPricingStrategyWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumPricingStrategyWithAggregatesFilter>;
export const EnumPricingStrategyWithAggregatesFilterObjectZodSchema = makeSchema();
