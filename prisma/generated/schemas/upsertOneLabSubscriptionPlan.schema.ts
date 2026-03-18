import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSubscriptionPlanSelectObjectSchema as LabSubscriptionPlanSelectObjectSchema } from './objects/LabSubscriptionPlanSelect.schema';
import { LabSubscriptionPlanIncludeObjectSchema as LabSubscriptionPlanIncludeObjectSchema } from './objects/LabSubscriptionPlanInclude.schema';
import { LabSubscriptionPlanWhereUniqueInputObjectSchema as LabSubscriptionPlanWhereUniqueInputObjectSchema } from './objects/LabSubscriptionPlanWhereUniqueInput.schema';
import { LabSubscriptionPlanCreateInputObjectSchema as LabSubscriptionPlanCreateInputObjectSchema } from './objects/LabSubscriptionPlanCreateInput.schema';
import { LabSubscriptionPlanUncheckedCreateInputObjectSchema as LabSubscriptionPlanUncheckedCreateInputObjectSchema } from './objects/LabSubscriptionPlanUncheckedCreateInput.schema';
import { LabSubscriptionPlanUpdateInputObjectSchema as LabSubscriptionPlanUpdateInputObjectSchema } from './objects/LabSubscriptionPlanUpdateInput.schema';
import { LabSubscriptionPlanUncheckedUpdateInputObjectSchema as LabSubscriptionPlanUncheckedUpdateInputObjectSchema } from './objects/LabSubscriptionPlanUncheckedUpdateInput.schema';

export const LabSubscriptionPlanUpsertOneSchema: z.ZodType<Prisma.LabSubscriptionPlanUpsertArgs> = z.object({ select: LabSubscriptionPlanSelectObjectSchema.optional(), include: LabSubscriptionPlanIncludeObjectSchema.optional(), where: LabSubscriptionPlanWhereUniqueInputObjectSchema, create: z.union([ LabSubscriptionPlanCreateInputObjectSchema, LabSubscriptionPlanUncheckedCreateInputObjectSchema ]), update: z.union([ LabSubscriptionPlanUpdateInputObjectSchema, LabSubscriptionPlanUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.LabSubscriptionPlanUpsertArgs>;

export const LabSubscriptionPlanUpsertOneZodSchema = z.object({ select: LabSubscriptionPlanSelectObjectSchema.optional(), include: LabSubscriptionPlanIncludeObjectSchema.optional(), where: LabSubscriptionPlanWhereUniqueInputObjectSchema, create: z.union([ LabSubscriptionPlanCreateInputObjectSchema, LabSubscriptionPlanUncheckedCreateInputObjectSchema ]), update: z.union([ LabSubscriptionPlanUpdateInputObjectSchema, LabSubscriptionPlanUncheckedUpdateInputObjectSchema ]) }).strict();