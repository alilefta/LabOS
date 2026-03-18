import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PricingStrategySchema } from '../enums/PricingStrategy.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumPricingStrategyFilterObjectSchema as NestedEnumPricingStrategyFilterObjectSchema } from './NestedEnumPricingStrategyFilter.schema'

const nestedenumpricingstrategywithaggregatesfilterSchema = z.object({
  equals: PricingStrategySchema.optional(),
  in: PricingStrategySchema.array().optional(),
  notIn: PricingStrategySchema.array().optional(),
  not: z.union([PricingStrategySchema, z.lazy(() => NestedEnumPricingStrategyWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumPricingStrategyFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumPricingStrategyFilterObjectSchema).optional()
}).strict();
export const NestedEnumPricingStrategyWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumPricingStrategyWithAggregatesFilter> = nestedenumpricingstrategywithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumPricingStrategyWithAggregatesFilter>;
export const NestedEnumPricingStrategyWithAggregatesFilterObjectZodSchema = nestedenumpricingstrategywithaggregatesfilterSchema;
