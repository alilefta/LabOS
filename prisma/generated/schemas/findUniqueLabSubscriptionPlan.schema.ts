import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSubscriptionPlanSelectObjectSchema as LabSubscriptionPlanSelectObjectSchema } from './objects/LabSubscriptionPlanSelect.schema';
import { LabSubscriptionPlanIncludeObjectSchema as LabSubscriptionPlanIncludeObjectSchema } from './objects/LabSubscriptionPlanInclude.schema';
import { LabSubscriptionPlanWhereUniqueInputObjectSchema as LabSubscriptionPlanWhereUniqueInputObjectSchema } from './objects/LabSubscriptionPlanWhereUniqueInput.schema';

export const LabSubscriptionPlanFindUniqueSchema: z.ZodType<Prisma.LabSubscriptionPlanFindUniqueArgs> = z.object({ select: LabSubscriptionPlanSelectObjectSchema.optional(), include: LabSubscriptionPlanIncludeObjectSchema.optional(), where: LabSubscriptionPlanWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.LabSubscriptionPlanFindUniqueArgs>;

export const LabSubscriptionPlanFindUniqueZodSchema = z.object({ select: LabSubscriptionPlanSelectObjectSchema.optional(), include: LabSubscriptionPlanIncludeObjectSchema.optional(), where: LabSubscriptionPlanWhereUniqueInputObjectSchema }).strict();