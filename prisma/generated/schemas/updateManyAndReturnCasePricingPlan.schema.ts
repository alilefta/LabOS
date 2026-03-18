import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CasePricingPlanSelectObjectSchema as CasePricingPlanSelectObjectSchema } from './objects/CasePricingPlanSelect.schema';
import { CasePricingPlanUpdateManyMutationInputObjectSchema as CasePricingPlanUpdateManyMutationInputObjectSchema } from './objects/CasePricingPlanUpdateManyMutationInput.schema';
import { CasePricingPlanWhereInputObjectSchema as CasePricingPlanWhereInputObjectSchema } from './objects/CasePricingPlanWhereInput.schema';

export const CasePricingPlanUpdateManyAndReturnSchema: z.ZodType<Prisma.CasePricingPlanUpdateManyAndReturnArgs> = z.object({ select: CasePricingPlanSelectObjectSchema.optional(), data: CasePricingPlanUpdateManyMutationInputObjectSchema, where: CasePricingPlanWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CasePricingPlanUpdateManyAndReturnArgs>;

export const CasePricingPlanUpdateManyAndReturnZodSchema = z.object({ select: CasePricingPlanSelectObjectSchema.optional(), data: CasePricingPlanUpdateManyMutationInputObjectSchema, where: CasePricingPlanWhereInputObjectSchema.optional() }).strict();