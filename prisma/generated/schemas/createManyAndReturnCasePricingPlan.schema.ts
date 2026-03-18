import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CasePricingPlanSelectObjectSchema as CasePricingPlanSelectObjectSchema } from './objects/CasePricingPlanSelect.schema';
import { CasePricingPlanCreateManyInputObjectSchema as CasePricingPlanCreateManyInputObjectSchema } from './objects/CasePricingPlanCreateManyInput.schema';

export const CasePricingPlanCreateManyAndReturnSchema: z.ZodType<Prisma.CasePricingPlanCreateManyAndReturnArgs> = z.object({ select: CasePricingPlanSelectObjectSchema.optional(), data: z.union([ CasePricingPlanCreateManyInputObjectSchema, z.array(CasePricingPlanCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CasePricingPlanCreateManyAndReturnArgs>;

export const CasePricingPlanCreateManyAndReturnZodSchema = z.object({ select: CasePricingPlanSelectObjectSchema.optional(), data: z.union([ CasePricingPlanCreateManyInputObjectSchema, z.array(CasePricingPlanCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();