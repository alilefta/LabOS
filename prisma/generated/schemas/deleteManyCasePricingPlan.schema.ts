import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CasePricingPlanWhereInputObjectSchema as CasePricingPlanWhereInputObjectSchema } from './objects/CasePricingPlanWhereInput.schema';

export const CasePricingPlanDeleteManySchema: z.ZodType<Prisma.CasePricingPlanDeleteManyArgs> = z.object({ where: CasePricingPlanWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CasePricingPlanDeleteManyArgs>;

export const CasePricingPlanDeleteManyZodSchema = z.object({ where: CasePricingPlanWhereInputObjectSchema.optional() }).strict();