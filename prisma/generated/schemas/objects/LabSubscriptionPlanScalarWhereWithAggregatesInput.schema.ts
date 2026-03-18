import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const labsubscriptionplanscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => LabSubscriptionPlanScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => LabSubscriptionPlanScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => LabSubscriptionPlanScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => LabSubscriptionPlanScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => LabSubscriptionPlanScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  subscriptionNextRenewal: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  isCancelled: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  cancellationDate: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const LabSubscriptionPlanScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanScalarWhereWithAggregatesInput> = labsubscriptionplanscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.LabSubscriptionPlanScalarWhereWithAggregatesInput>;
export const LabSubscriptionPlanScalarWhereWithAggregatesInputObjectZodSchema = labsubscriptionplanscalarwherewithaggregatesinputSchema;
