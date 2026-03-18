import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanWhereInputObjectSchema as CasePricingPlanWhereInputObjectSchema } from './CasePricingPlanWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => CasePricingPlanWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => CasePricingPlanWhereInputObjectSchema).optional()
}).strict();
export const CasePricingPlanScalarRelationFilterObjectSchema: z.ZodType<Prisma.CasePricingPlanScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanScalarRelationFilter>;
export const CasePricingPlanScalarRelationFilterObjectZodSchema = makeSchema();
