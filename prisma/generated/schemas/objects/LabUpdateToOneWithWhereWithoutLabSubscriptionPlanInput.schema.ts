import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutLabSubscriptionPlanInputObjectSchema as LabUpdateWithoutLabSubscriptionPlanInputObjectSchema } from './LabUpdateWithoutLabSubscriptionPlanInput.schema';
import { LabUncheckedUpdateWithoutLabSubscriptionPlanInputObjectSchema as LabUncheckedUpdateWithoutLabSubscriptionPlanInputObjectSchema } from './LabUncheckedUpdateWithoutLabSubscriptionPlanInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutLabSubscriptionPlanInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutLabSubscriptionPlanInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutLabSubscriptionPlanInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutLabSubscriptionPlanInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutLabSubscriptionPlanInput>;
export const LabUpdateToOneWithWhereWithoutLabSubscriptionPlanInputObjectZodSchema = makeSchema();
