import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SubscriptionTierSchema } from '../enums/SubscriptionTier.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumSubscriptionTierFilterObjectSchema as NestedEnumSubscriptionTierFilterObjectSchema } from './NestedEnumSubscriptionTierFilter.schema'

const nestedenumsubscriptiontierwithaggregatesfilterSchema = z.object({
  equals: SubscriptionTierSchema.optional(),
  in: SubscriptionTierSchema.array().optional(),
  notIn: SubscriptionTierSchema.array().optional(),
  not: z.union([SubscriptionTierSchema, z.lazy(() => NestedEnumSubscriptionTierWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumSubscriptionTierFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumSubscriptionTierFilterObjectSchema).optional()
}).strict();
export const NestedEnumSubscriptionTierWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumSubscriptionTierWithAggregatesFilter> = nestedenumsubscriptiontierwithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumSubscriptionTierWithAggregatesFilter>;
export const NestedEnumSubscriptionTierWithAggregatesFilterObjectZodSchema = nestedenumsubscriptiontierwithaggregatesfilterSchema;
