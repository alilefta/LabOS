import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutLabSubscriptionPlanInputObjectSchema as LabCreateWithoutLabSubscriptionPlanInputObjectSchema } from './LabCreateWithoutLabSubscriptionPlanInput.schema';
import { LabUncheckedCreateWithoutLabSubscriptionPlanInputObjectSchema as LabUncheckedCreateWithoutLabSubscriptionPlanInputObjectSchema } from './LabUncheckedCreateWithoutLabSubscriptionPlanInput.schema';
import { LabCreateOrConnectWithoutLabSubscriptionPlanInputObjectSchema as LabCreateOrConnectWithoutLabSubscriptionPlanInputObjectSchema } from './LabCreateOrConnectWithoutLabSubscriptionPlanInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutLabSubscriptionPlanInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutLabSubscriptionPlanInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutLabSubscriptionPlanInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutLabSubscriptionPlanInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutLabSubscriptionPlanInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutLabSubscriptionPlanInput>;
export const LabCreateNestedOneWithoutLabSubscriptionPlanInputObjectZodSchema = makeSchema();
