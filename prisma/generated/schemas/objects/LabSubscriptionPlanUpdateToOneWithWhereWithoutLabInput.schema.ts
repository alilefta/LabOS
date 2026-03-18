import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabSubscriptionPlanWhereInputObjectSchema as LabSubscriptionPlanWhereInputObjectSchema } from './LabSubscriptionPlanWhereInput.schema';
import { LabSubscriptionPlanUpdateWithoutLabInputObjectSchema as LabSubscriptionPlanUpdateWithoutLabInputObjectSchema } from './LabSubscriptionPlanUpdateWithoutLabInput.schema';
import { LabSubscriptionPlanUncheckedUpdateWithoutLabInputObjectSchema as LabSubscriptionPlanUncheckedUpdateWithoutLabInputObjectSchema } from './LabSubscriptionPlanUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabSubscriptionPlanWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabSubscriptionPlanUpdateWithoutLabInputObjectSchema), z.lazy(() => LabSubscriptionPlanUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const LabSubscriptionPlanUpdateToOneWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanUpdateToOneWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanUpdateToOneWithWhereWithoutLabInput>;
export const LabSubscriptionPlanUpdateToOneWithWhereWithoutLabInputObjectZodSchema = makeSchema();
