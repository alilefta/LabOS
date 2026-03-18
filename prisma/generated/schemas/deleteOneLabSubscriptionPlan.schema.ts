import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSubscriptionPlanSelectObjectSchema as LabSubscriptionPlanSelectObjectSchema } from './objects/LabSubscriptionPlanSelect.schema';
import { LabSubscriptionPlanIncludeObjectSchema as LabSubscriptionPlanIncludeObjectSchema } from './objects/LabSubscriptionPlanInclude.schema';
import { LabSubscriptionPlanWhereUniqueInputObjectSchema as LabSubscriptionPlanWhereUniqueInputObjectSchema } from './objects/LabSubscriptionPlanWhereUniqueInput.schema';

export const LabSubscriptionPlanDeleteOneSchema: z.ZodType<Prisma.LabSubscriptionPlanDeleteArgs> = z.object({ select: LabSubscriptionPlanSelectObjectSchema.optional(), include: LabSubscriptionPlanIncludeObjectSchema.optional(), where: LabSubscriptionPlanWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.LabSubscriptionPlanDeleteArgs>;

export const LabSubscriptionPlanDeleteOneZodSchema = z.object({ select: LabSubscriptionPlanSelectObjectSchema.optional(), include: LabSubscriptionPlanIncludeObjectSchema.optional(), where: LabSubscriptionPlanWhereUniqueInputObjectSchema }).strict();