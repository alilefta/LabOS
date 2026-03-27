import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanWhereInputObjectSchema as CasePricingPlanWhereInputObjectSchema } from './CasePricingPlanWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CasePricingPlanWhereInputObjectSchema).optional()
}).strict();
export const ProductCountOutputTypeCountCasePricingPlansArgsObjectSchema = makeSchema();
export const ProductCountOutputTypeCountCasePricingPlansArgsObjectZodSchema = makeSchema();
