import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SubscriptionTierSchema } from '../enums/SubscriptionTier.schema'

const nestedenumsubscriptiontierfilterSchema = z.object({
  equals: SubscriptionTierSchema.optional(),
  in: SubscriptionTierSchema.array().optional(),
  notIn: SubscriptionTierSchema.array().optional(),
  not: z.union([SubscriptionTierSchema, z.lazy(() => NestedEnumSubscriptionTierFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumSubscriptionTierFilterObjectSchema: z.ZodType<Prisma.NestedEnumSubscriptionTierFilter> = nestedenumsubscriptiontierfilterSchema as unknown as z.ZodType<Prisma.NestedEnumSubscriptionTierFilter>;
export const NestedEnumSubscriptionTierFilterObjectZodSchema = nestedenumsubscriptiontierfilterSchema;
