import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSubscriptionPlanSelectObjectSchema as LabSubscriptionPlanSelectObjectSchema } from './objects/LabSubscriptionPlanSelect.schema';
import { LabSubscriptionPlanCreateManyInputObjectSchema as LabSubscriptionPlanCreateManyInputObjectSchema } from './objects/LabSubscriptionPlanCreateManyInput.schema';

export const LabSubscriptionPlanCreateManyAndReturnSchema: z.ZodType<Prisma.LabSubscriptionPlanCreateManyAndReturnArgs> = z.object({ select: LabSubscriptionPlanSelectObjectSchema.optional(), data: z.union([ LabSubscriptionPlanCreateManyInputObjectSchema, z.array(LabSubscriptionPlanCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.LabSubscriptionPlanCreateManyAndReturnArgs>;

export const LabSubscriptionPlanCreateManyAndReturnZodSchema = z.object({ select: LabSubscriptionPlanSelectObjectSchema.optional(), data: z.union([ LabSubscriptionPlanCreateManyInputObjectSchema, z.array(LabSubscriptionPlanCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();