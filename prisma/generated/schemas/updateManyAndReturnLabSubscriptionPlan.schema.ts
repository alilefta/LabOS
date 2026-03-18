import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSubscriptionPlanSelectObjectSchema as LabSubscriptionPlanSelectObjectSchema } from './objects/LabSubscriptionPlanSelect.schema';
import { LabSubscriptionPlanUpdateManyMutationInputObjectSchema as LabSubscriptionPlanUpdateManyMutationInputObjectSchema } from './objects/LabSubscriptionPlanUpdateManyMutationInput.schema';
import { LabSubscriptionPlanWhereInputObjectSchema as LabSubscriptionPlanWhereInputObjectSchema } from './objects/LabSubscriptionPlanWhereInput.schema';

export const LabSubscriptionPlanUpdateManyAndReturnSchema: z.ZodType<Prisma.LabSubscriptionPlanUpdateManyAndReturnArgs> = z.object({ select: LabSubscriptionPlanSelectObjectSchema.optional(), data: LabSubscriptionPlanUpdateManyMutationInputObjectSchema, where: LabSubscriptionPlanWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabSubscriptionPlanUpdateManyAndReturnArgs>;

export const LabSubscriptionPlanUpdateManyAndReturnZodSchema = z.object({ select: LabSubscriptionPlanSelectObjectSchema.optional(), data: LabSubscriptionPlanUpdateManyMutationInputObjectSchema, where: LabSubscriptionPlanWhereInputObjectSchema.optional() }).strict();