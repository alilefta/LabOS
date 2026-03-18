import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PricingStrategySchema } from '../enums/PricingStrategy.schema'

const nestedenumpricingstrategyfilterSchema = z.object({
  equals: PricingStrategySchema.optional(),
  in: PricingStrategySchema.array().optional(),
  notIn: PricingStrategySchema.array().optional(),
  not: z.union([PricingStrategySchema, z.lazy(() => NestedEnumPricingStrategyFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumPricingStrategyFilterObjectSchema: z.ZodType<Prisma.NestedEnumPricingStrategyFilter> = nestedenumpricingstrategyfilterSchema as unknown as z.ZodType<Prisma.NestedEnumPricingStrategyFilter>;
export const NestedEnumPricingStrategyFilterObjectZodSchema = nestedenumpricingstrategyfilterSchema;
