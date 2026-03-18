import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSubscriptionPlanWhereInputObjectSchema as LabSubscriptionPlanWhereInputObjectSchema } from './objects/LabSubscriptionPlanWhereInput.schema';

export const LabSubscriptionPlanDeleteManySchema: z.ZodType<Prisma.LabSubscriptionPlanDeleteManyArgs> = z.object({ where: LabSubscriptionPlanWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabSubscriptionPlanDeleteManyArgs>;

export const LabSubscriptionPlanDeleteManyZodSchema = z.object({ where: LabSubscriptionPlanWhereInputObjectSchema.optional() }).strict();