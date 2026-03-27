import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  tier: SortOrderSchema.optional(),
  maxMembers: SortOrderSchema.optional(),
  maxCasesMonth: SortOrderSchema.optional(),
  stripeCustomerId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  stripeSubscriptionId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  stripePriceId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  subscriptionNextRenewal: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  isCancelled: SortOrderSchema.optional(),
  cancellationDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const LabSubscriptionPlanOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanOrderByWithRelationInput>;
export const LabSubscriptionPlanOrderByWithRelationInputObjectZodSchema = makeSchema();
