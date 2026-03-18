import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CasePricingPlanSelectObjectSchema as CasePricingPlanSelectObjectSchema } from './objects/CasePricingPlanSelect.schema';
import { CasePricingPlanIncludeObjectSchema as CasePricingPlanIncludeObjectSchema } from './objects/CasePricingPlanInclude.schema';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './objects/CasePricingPlanWhereUniqueInput.schema';
import { CasePricingPlanCreateInputObjectSchema as CasePricingPlanCreateInputObjectSchema } from './objects/CasePricingPlanCreateInput.schema';
import { CasePricingPlanUncheckedCreateInputObjectSchema as CasePricingPlanUncheckedCreateInputObjectSchema } from './objects/CasePricingPlanUncheckedCreateInput.schema';
import { CasePricingPlanUpdateInputObjectSchema as CasePricingPlanUpdateInputObjectSchema } from './objects/CasePricingPlanUpdateInput.schema';
import { CasePricingPlanUncheckedUpdateInputObjectSchema as CasePricingPlanUncheckedUpdateInputObjectSchema } from './objects/CasePricingPlanUncheckedUpdateInput.schema';

export const CasePricingPlanUpsertOneSchema: z.ZodType<Prisma.CasePricingPlanUpsertArgs> = z.object({ select: CasePricingPlanSelectObjectSchema.optional(), include: CasePricingPlanIncludeObjectSchema.optional(), where: CasePricingPlanWhereUniqueInputObjectSchema, create: z.union([ CasePricingPlanCreateInputObjectSchema, CasePricingPlanUncheckedCreateInputObjectSchema ]), update: z.union([ CasePricingPlanUpdateInputObjectSchema, CasePricingPlanUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CasePricingPlanUpsertArgs>;

export const CasePricingPlanUpsertOneZodSchema = z.object({ select: CasePricingPlanSelectObjectSchema.optional(), include: CasePricingPlanIncludeObjectSchema.optional(), where: CasePricingPlanWhereUniqueInputObjectSchema, create: z.union([ CasePricingPlanCreateInputObjectSchema, CasePricingPlanUncheckedCreateInputObjectSchema ]), update: z.union([ CasePricingPlanUpdateInputObjectSchema, CasePricingPlanUncheckedUpdateInputObjectSchema ]) }).strict();