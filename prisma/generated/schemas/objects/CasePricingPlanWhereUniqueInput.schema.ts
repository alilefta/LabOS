import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const CasePricingPlanWhereUniqueInputObjectSchema: z.ZodType<Prisma.CasePricingPlanWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanWhereUniqueInput>;
export const CasePricingPlanWhereUniqueInputObjectZodSchema = makeSchema();
