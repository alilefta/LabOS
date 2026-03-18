import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabSubscriptionPlanWhereUniqueInputObjectSchema as LabSubscriptionPlanWhereUniqueInputObjectSchema } from './LabSubscriptionPlanWhereUniqueInput.schema';
import { LabSubscriptionPlanCreateWithoutLabInputObjectSchema as LabSubscriptionPlanCreateWithoutLabInputObjectSchema } from './LabSubscriptionPlanCreateWithoutLabInput.schema';
import { LabSubscriptionPlanUncheckedCreateWithoutLabInputObjectSchema as LabSubscriptionPlanUncheckedCreateWithoutLabInputObjectSchema } from './LabSubscriptionPlanUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabSubscriptionPlanWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabSubscriptionPlanCreateWithoutLabInputObjectSchema), z.lazy(() => LabSubscriptionPlanUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const LabSubscriptionPlanCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanCreateOrConnectWithoutLabInput>;
export const LabSubscriptionPlanCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
