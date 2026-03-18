import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const labsubscriptionplanwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => LabSubscriptionPlanWhereInputObjectSchema), z.lazy(() => LabSubscriptionPlanWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => LabSubscriptionPlanWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => LabSubscriptionPlanWhereInputObjectSchema), z.lazy(() => LabSubscriptionPlanWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  subscriptionNextRenewal: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  isCancelled: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  cancellationDate: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  Lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional()
}).strict();
export const LabSubscriptionPlanWhereInputObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanWhereInput> = labsubscriptionplanwhereinputSchema as unknown as z.ZodType<Prisma.LabSubscriptionPlanWhereInput>;
export const LabSubscriptionPlanWhereInputObjectZodSchema = labsubscriptionplanwhereinputSchema;
