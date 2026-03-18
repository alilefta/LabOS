import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CasePricingPlanCreateManyInputObjectSchema as CasePricingPlanCreateManyInputObjectSchema } from './objects/CasePricingPlanCreateManyInput.schema';

export const CasePricingPlanCreateManySchema: z.ZodType<Prisma.CasePricingPlanCreateManyArgs> = z.object({ data: z.union([ CasePricingPlanCreateManyInputObjectSchema, z.array(CasePricingPlanCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CasePricingPlanCreateManyArgs>;

export const CasePricingPlanCreateManyZodSchema = z.object({ data: z.union([ CasePricingPlanCreateManyInputObjectSchema, z.array(CasePricingPlanCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();