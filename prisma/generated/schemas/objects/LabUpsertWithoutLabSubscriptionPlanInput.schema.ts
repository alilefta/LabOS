import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutLabSubscriptionPlanInputObjectSchema as LabUpdateWithoutLabSubscriptionPlanInputObjectSchema } from './LabUpdateWithoutLabSubscriptionPlanInput.schema';
import { LabUncheckedUpdateWithoutLabSubscriptionPlanInputObjectSchema as LabUncheckedUpdateWithoutLabSubscriptionPlanInputObjectSchema } from './LabUncheckedUpdateWithoutLabSubscriptionPlanInput.schema';
import { LabCreateWithoutLabSubscriptionPlanInputObjectSchema as LabCreateWithoutLabSubscriptionPlanInputObjectSchema } from './LabCreateWithoutLabSubscriptionPlanInput.schema';
import { LabUncheckedCreateWithoutLabSubscriptionPlanInputObjectSchema as LabUncheckedCreateWithoutLabSubscriptionPlanInputObjectSchema } from './LabUncheckedCreateWithoutLabSubscriptionPlanInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutLabSubscriptionPlanInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutLabSubscriptionPlanInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutLabSubscriptionPlanInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutLabSubscriptionPlanInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutLabSubscriptionPlanInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutLabSubscriptionPlanInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutLabSubscriptionPlanInput>;
export const LabUpsertWithoutLabSubscriptionPlanInputObjectZodSchema = makeSchema();
