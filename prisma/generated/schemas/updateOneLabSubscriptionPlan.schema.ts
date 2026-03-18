import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSubscriptionPlanSelectObjectSchema as LabSubscriptionPlanSelectObjectSchema } from './objects/LabSubscriptionPlanSelect.schema';
import { LabSubscriptionPlanIncludeObjectSchema as LabSubscriptionPlanIncludeObjectSchema } from './objects/LabSubscriptionPlanInclude.schema';
import { LabSubscriptionPlanUpdateInputObjectSchema as LabSubscriptionPlanUpdateInputObjectSchema } from './objects/LabSubscriptionPlanUpdateInput.schema';
import { LabSubscriptionPlanUncheckedUpdateInputObjectSchema as LabSubscriptionPlanUncheckedUpdateInputObjectSchema } from './objects/LabSubscriptionPlanUncheckedUpdateInput.schema';
import { LabSubscriptionPlanWhereUniqueInputObjectSchema as LabSubscriptionPlanWhereUniqueInputObjectSchema } from './objects/LabSubscriptionPlanWhereUniqueInput.schema';

export const LabSubscriptionPlanUpdateOneSchema: z.ZodType<Prisma.LabSubscriptionPlanUpdateArgs> = z.object({ select: LabSubscriptionPlanSelectObjectSchema.optional(), include: LabSubscriptionPlanIncludeObjectSchema.optional(), data: z.union([LabSubscriptionPlanUpdateInputObjectSchema, LabSubscriptionPlanUncheckedUpdateInputObjectSchema]), where: LabSubscriptionPlanWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.LabSubscriptionPlanUpdateArgs>;

export const LabSubscriptionPlanUpdateOneZodSchema = z.object({ select: LabSubscriptionPlanSelectObjectSchema.optional(), include: LabSubscriptionPlanIncludeObjectSchema.optional(), data: z.union([LabSubscriptionPlanUpdateInputObjectSchema, LabSubscriptionPlanUncheckedUpdateInputObjectSchema]), where: LabSubscriptionPlanWhereUniqueInputObjectSchema }).strict();