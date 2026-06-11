import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanWhereInputObjectSchema as CasePricingPlanWhereInputObjectSchema } from './CasePricingPlanWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => CasePricingPlanWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => CasePricingPlanWhereInputObjectSchema).optional().nullable()
}).strict();
export const CasePricingPlanNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.CasePricingPlanNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanNullableScalarRelationFilter>;
export const CasePricingPlanNullableScalarRelationFilterObjectZodSchema = makeSchema();
