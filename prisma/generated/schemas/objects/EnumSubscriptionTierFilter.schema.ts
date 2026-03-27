import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SubscriptionTierSchema } from '../enums/SubscriptionTier.schema';
import { NestedEnumSubscriptionTierFilterObjectSchema as NestedEnumSubscriptionTierFilterObjectSchema } from './NestedEnumSubscriptionTierFilter.schema'

const makeSchema = () => z.object({
  equals: SubscriptionTierSchema.optional(),
  in: SubscriptionTierSchema.array().optional(),
  notIn: SubscriptionTierSchema.array().optional(),
  not: z.union([SubscriptionTierSchema, z.lazy(() => NestedEnumSubscriptionTierFilterObjectSchema)]).optional()
}).strict();
export const EnumSubscriptionTierFilterObjectSchema: z.ZodType<Prisma.EnumSubscriptionTierFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumSubscriptionTierFilter>;
export const EnumSubscriptionTierFilterObjectZodSchema = makeSchema();
