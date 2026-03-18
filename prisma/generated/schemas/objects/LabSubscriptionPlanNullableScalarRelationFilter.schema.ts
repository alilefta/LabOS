import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabSubscriptionPlanWhereInputObjectSchema as LabSubscriptionPlanWhereInputObjectSchema } from './LabSubscriptionPlanWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => LabSubscriptionPlanWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => LabSubscriptionPlanWhereInputObjectSchema).optional().nullable()
}).strict();
export const LabSubscriptionPlanNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanNullableScalarRelationFilter>;
export const LabSubscriptionPlanNullableScalarRelationFilterObjectZodSchema = makeSchema();
