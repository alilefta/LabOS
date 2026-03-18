import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CasePricingPlanUpdateManyMutationInputObjectSchema as CasePricingPlanUpdateManyMutationInputObjectSchema } from './objects/CasePricingPlanUpdateManyMutationInput.schema';
import { CasePricingPlanWhereInputObjectSchema as CasePricingPlanWhereInputObjectSchema } from './objects/CasePricingPlanWhereInput.schema';

export const CasePricingPlanUpdateManySchema: z.ZodType<Prisma.CasePricingPlanUpdateManyArgs> = z.object({ data: CasePricingPlanUpdateManyMutationInputObjectSchema, where: CasePricingPlanWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CasePricingPlanUpdateManyArgs>;

export const CasePricingPlanUpdateManyZodSchema = z.object({ data: CasePricingPlanUpdateManyMutationInputObjectSchema, where: CasePricingPlanWhereInputObjectSchema.optional() }).strict();