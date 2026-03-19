import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateNestedOneWithoutLabSubscriptionPlanInputObjectSchema as LabCreateNestedOneWithoutLabSubscriptionPlanInputObjectSchema } from './LabCreateNestedOneWithoutLabSubscriptionPlanInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  subscriptionNextRenewal: z.coerce.date().optional().nullable(),
  isCancelled: z.boolean().optional(),
  cancellationDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutLabSubscriptionPlanInputObjectSchema)
}).strict();
export const LabSubscriptionPlanCreateInputObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanCreateInput>;
export const LabSubscriptionPlanCreateInputObjectZodSchema = makeSchema();
