import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSubscriptionPlanCreateManyInputObjectSchema as LabSubscriptionPlanCreateManyInputObjectSchema } from './objects/LabSubscriptionPlanCreateManyInput.schema';

export const LabSubscriptionPlanCreateManySchema: z.ZodType<Prisma.LabSubscriptionPlanCreateManyArgs> = z.object({ data: z.union([ LabSubscriptionPlanCreateManyInputObjectSchema, z.array(LabSubscriptionPlanCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.LabSubscriptionPlanCreateManyArgs>;

export const LabSubscriptionPlanCreateManyZodSchema = z.object({ data: z.union([ LabSubscriptionPlanCreateManyInputObjectSchema, z.array(LabSubscriptionPlanCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();