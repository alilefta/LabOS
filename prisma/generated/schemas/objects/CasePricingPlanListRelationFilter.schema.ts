import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanWhereInputObjectSchema as CasePricingPlanWhereInputObjectSchema } from './CasePricingPlanWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => CasePricingPlanWhereInputObjectSchema).optional(),
  some: z.lazy(() => CasePricingPlanWhereInputObjectSchema).optional(),
  none: z.lazy(() => CasePricingPlanWhereInputObjectSchema).optional()
}).strict();
export const CasePricingPlanListRelationFilterObjectSchema: z.ZodType<Prisma.CasePricingPlanListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanListRelationFilter>;
export const CasePricingPlanListRelationFilterObjectZodSchema = makeSchema();
