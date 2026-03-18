import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  subscriptionNextRenewal: z.coerce.date().optional().nullable(),
  isCancelled: z.boolean().optional(),
  cancellationDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const LabSubscriptionPlanCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanCreateWithoutLabInput>;
export const LabSubscriptionPlanCreateWithoutLabInputObjectZodSchema = makeSchema();
