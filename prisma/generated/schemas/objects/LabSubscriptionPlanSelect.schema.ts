import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  labId: z.boolean().optional(),
  Lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  subscriptionNextRenewal: z.boolean().optional(),
  isCancelled: z.boolean().optional(),
  cancellationDate: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const LabSubscriptionPlanSelectObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanSelect> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanSelect>;
export const LabSubscriptionPlanSelectObjectZodSchema = makeSchema();
