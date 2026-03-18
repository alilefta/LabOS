import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSubscriptionPlanSelectObjectSchema as LabSubscriptionPlanSelectObjectSchema } from './objects/LabSubscriptionPlanSelect.schema';
import { LabSubscriptionPlanIncludeObjectSchema as LabSubscriptionPlanIncludeObjectSchema } from './objects/LabSubscriptionPlanInclude.schema';
import { LabSubscriptionPlanCreateInputObjectSchema as LabSubscriptionPlanCreateInputObjectSchema } from './objects/LabSubscriptionPlanCreateInput.schema';
import { LabSubscriptionPlanUncheckedCreateInputObjectSchema as LabSubscriptionPlanUncheckedCreateInputObjectSchema } from './objects/LabSubscriptionPlanUncheckedCreateInput.schema';

export const LabSubscriptionPlanCreateOneSchema: z.ZodType<Prisma.LabSubscriptionPlanCreateArgs> = z.object({ select: LabSubscriptionPlanSelectObjectSchema.optional(), include: LabSubscriptionPlanIncludeObjectSchema.optional(), data: z.union([LabSubscriptionPlanCreateInputObjectSchema, LabSubscriptionPlanUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.LabSubscriptionPlanCreateArgs>;

export const LabSubscriptionPlanCreateOneZodSchema = z.object({ select: LabSubscriptionPlanSelectObjectSchema.optional(), include: LabSubscriptionPlanIncludeObjectSchema.optional(), data: z.union([LabSubscriptionPlanCreateInputObjectSchema, LabSubscriptionPlanUncheckedCreateInputObjectSchema]) }).strict();