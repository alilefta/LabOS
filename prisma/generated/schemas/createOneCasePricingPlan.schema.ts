import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CasePricingPlanSelectObjectSchema as CasePricingPlanSelectObjectSchema } from './objects/CasePricingPlanSelect.schema';
import { CasePricingPlanIncludeObjectSchema as CasePricingPlanIncludeObjectSchema } from './objects/CasePricingPlanInclude.schema';
import { CasePricingPlanCreateInputObjectSchema as CasePricingPlanCreateInputObjectSchema } from './objects/CasePricingPlanCreateInput.schema';
import { CasePricingPlanUncheckedCreateInputObjectSchema as CasePricingPlanUncheckedCreateInputObjectSchema } from './objects/CasePricingPlanUncheckedCreateInput.schema';

export const CasePricingPlanCreateOneSchema: z.ZodType<Prisma.CasePricingPlanCreateArgs> = z.object({ select: CasePricingPlanSelectObjectSchema.optional(), include: CasePricingPlanIncludeObjectSchema.optional(), data: z.union([CasePricingPlanCreateInputObjectSchema, CasePricingPlanUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.CasePricingPlanCreateArgs>;

export const CasePricingPlanCreateOneZodSchema = z.object({ select: CasePricingPlanSelectObjectSchema.optional(), include: CasePricingPlanIncludeObjectSchema.optional(), data: z.union([CasePricingPlanCreateInputObjectSchema, CasePricingPlanUncheckedCreateInputObjectSchema]) }).strict();