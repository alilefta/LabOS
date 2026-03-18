import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  labId: z.string(),
  subscriptionNextRenewal: z.coerce.date().optional().nullable(),
  isCancelled: z.boolean().optional(),
  cancellationDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const LabSubscriptionPlanUncheckedCreateInputObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanUncheckedCreateInput>;
export const LabSubscriptionPlanUncheckedCreateInputObjectZodSchema = makeSchema();
