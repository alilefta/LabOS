import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CasePricingPlanSelectObjectSchema as CasePricingPlanSelectObjectSchema } from './objects/CasePricingPlanSelect.schema';
import { CasePricingPlanIncludeObjectSchema as CasePricingPlanIncludeObjectSchema } from './objects/CasePricingPlanInclude.schema';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './objects/CasePricingPlanWhereUniqueInput.schema';

export const CasePricingPlanFindUniqueOrThrowSchema: z.ZodType<Prisma.CasePricingPlanFindUniqueOrThrowArgs> = z.object({ select: CasePricingPlanSelectObjectSchema.optional(), include: CasePricingPlanIncludeObjectSchema.optional(), where: CasePricingPlanWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CasePricingPlanFindUniqueOrThrowArgs>;

export const CasePricingPlanFindUniqueOrThrowZodSchema = z.object({ select: CasePricingPlanSelectObjectSchema.optional(), include: CasePricingPlanIncludeObjectSchema.optional(), where: CasePricingPlanWhereUniqueInputObjectSchema }).strict();