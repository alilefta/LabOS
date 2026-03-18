import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabSubscriptionPlanCreateWithoutLabInputObjectSchema as LabSubscriptionPlanCreateWithoutLabInputObjectSchema } from './LabSubscriptionPlanCreateWithoutLabInput.schema';
import { LabSubscriptionPlanUncheckedCreateWithoutLabInputObjectSchema as LabSubscriptionPlanUncheckedCreateWithoutLabInputObjectSchema } from './LabSubscriptionPlanUncheckedCreateWithoutLabInput.schema';
import { LabSubscriptionPlanCreateOrConnectWithoutLabInputObjectSchema as LabSubscriptionPlanCreateOrConnectWithoutLabInputObjectSchema } from './LabSubscriptionPlanCreateOrConnectWithoutLabInput.schema';
import { LabSubscriptionPlanWhereUniqueInputObjectSchema as LabSubscriptionPlanWhereUniqueInputObjectSchema } from './LabSubscriptionPlanWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabSubscriptionPlanCreateWithoutLabInputObjectSchema), z.lazy(() => LabSubscriptionPlanUncheckedCreateWithoutLabInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabSubscriptionPlanCreateOrConnectWithoutLabInputObjectSchema).optional(),
  connect: z.lazy(() => LabSubscriptionPlanWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabSubscriptionPlanUncheckedCreateNestedOneWithoutLabInputObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanUncheckedCreateNestedOneWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanUncheckedCreateNestedOneWithoutLabInput>;
export const LabSubscriptionPlanUncheckedCreateNestedOneWithoutLabInputObjectZodSchema = makeSchema();
