import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabSubscriptionPlanUpdateWithoutLabInputObjectSchema as LabSubscriptionPlanUpdateWithoutLabInputObjectSchema } from './LabSubscriptionPlanUpdateWithoutLabInput.schema';
import { LabSubscriptionPlanUncheckedUpdateWithoutLabInputObjectSchema as LabSubscriptionPlanUncheckedUpdateWithoutLabInputObjectSchema } from './LabSubscriptionPlanUncheckedUpdateWithoutLabInput.schema';
import { LabSubscriptionPlanCreateWithoutLabInputObjectSchema as LabSubscriptionPlanCreateWithoutLabInputObjectSchema } from './LabSubscriptionPlanCreateWithoutLabInput.schema';
import { LabSubscriptionPlanUncheckedCreateWithoutLabInputObjectSchema as LabSubscriptionPlanUncheckedCreateWithoutLabInputObjectSchema } from './LabSubscriptionPlanUncheckedCreateWithoutLabInput.schema';
import { LabSubscriptionPlanWhereInputObjectSchema as LabSubscriptionPlanWhereInputObjectSchema } from './LabSubscriptionPlanWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabSubscriptionPlanUpdateWithoutLabInputObjectSchema), z.lazy(() => LabSubscriptionPlanUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => LabSubscriptionPlanCreateWithoutLabInputObjectSchema), z.lazy(() => LabSubscriptionPlanUncheckedCreateWithoutLabInputObjectSchema)]),
  where: z.lazy(() => LabSubscriptionPlanWhereInputObjectSchema).optional()
}).strict();
export const LabSubscriptionPlanUpsertWithoutLabInputObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanUpsertWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanUpsertWithoutLabInput>;
export const LabSubscriptionPlanUpsertWithoutLabInputObjectZodSchema = makeSchema();
