import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SubscriptionTierSchema } from '../enums/SubscriptionTier.schema';
import { NestedEnumSubscriptionTierWithAggregatesFilterObjectSchema as NestedEnumSubscriptionTierWithAggregatesFilterObjectSchema } from './NestedEnumSubscriptionTierWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumSubscriptionTierFilterObjectSchema as NestedEnumSubscriptionTierFilterObjectSchema } from './NestedEnumSubscriptionTierFilter.schema'

const makeSchema = () => z.object({
  equals: SubscriptionTierSchema.optional(),
  in: SubscriptionTierSchema.array().optional(),
  notIn: SubscriptionTierSchema.array().optional(),
  not: z.union([SubscriptionTierSchema, z.lazy(() => NestedEnumSubscriptionTierWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumSubscriptionTierFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumSubscriptionTierFilterObjectSchema).optional()
}).strict();
export const EnumSubscriptionTierWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumSubscriptionTierWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumSubscriptionTierWithAggregatesFilter>;
export const EnumSubscriptionTierWithAggregatesFilterObjectZodSchema = makeSchema();
