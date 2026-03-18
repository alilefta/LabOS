import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CasePricingPlanSelectObjectSchema as CasePricingPlanSelectObjectSchema } from './objects/CasePricingPlanSelect.schema';
import { CasePricingPlanIncludeObjectSchema as CasePricingPlanIncludeObjectSchema } from './objects/CasePricingPlanInclude.schema';
import { CasePricingPlanUpdateInputObjectSchema as CasePricingPlanUpdateInputObjectSchema } from './objects/CasePricingPlanUpdateInput.schema';
import { CasePricingPlanUncheckedUpdateInputObjectSchema as CasePricingPlanUncheckedUpdateInputObjectSchema } from './objects/CasePricingPlanUncheckedUpdateInput.schema';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './objects/CasePricingPlanWhereUniqueInput.schema';

export const CasePricingPlanUpdateOneSchema: z.ZodType<Prisma.CasePricingPlanUpdateArgs> = z.object({ select: CasePricingPlanSelectObjectSchema.optional(), include: CasePricingPlanIncludeObjectSchema.optional(), data: z.union([CasePricingPlanUpdateInputObjectSchema, CasePricingPlanUncheckedUpdateInputObjectSchema]), where: CasePricingPlanWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CasePricingPlanUpdateArgs>;

export const CasePricingPlanUpdateOneZodSchema = z.object({ select: CasePricingPlanSelectObjectSchema.optional(), include: CasePricingPlanIncludeObjectSchema.optional(), data: z.union([CasePricingPlanUpdateInputObjectSchema, CasePricingPlanUncheckedUpdateInputObjectSchema]), where: CasePricingPlanWhereUniqueInputObjectSchema }).strict();