import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSubscriptionPlanUpdateManyMutationInputObjectSchema as LabSubscriptionPlanUpdateManyMutationInputObjectSchema } from './objects/LabSubscriptionPlanUpdateManyMutationInput.schema';
import { LabSubscriptionPlanWhereInputObjectSchema as LabSubscriptionPlanWhereInputObjectSchema } from './objects/LabSubscriptionPlanWhereInput.schema';

export const LabSubscriptionPlanUpdateManySchema: z.ZodType<Prisma.LabSubscriptionPlanUpdateManyArgs> = z.object({ data: LabSubscriptionPlanUpdateManyMutationInputObjectSchema, where: LabSubscriptionPlanWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabSubscriptionPlanUpdateManyArgs>;

export const LabSubscriptionPlanUpdateManyZodSchema = z.object({ data: LabSubscriptionPlanUpdateManyMutationInputObjectSchema, where: LabSubscriptionPlanWhereInputObjectSchema.optional() }).strict();