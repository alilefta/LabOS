import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutLabSubscriptionPlanInputObjectSchema as LabCreateWithoutLabSubscriptionPlanInputObjectSchema } from './LabCreateWithoutLabSubscriptionPlanInput.schema';
import { LabUncheckedCreateWithoutLabSubscriptionPlanInputObjectSchema as LabUncheckedCreateWithoutLabSubscriptionPlanInputObjectSchema } from './LabUncheckedCreateWithoutLabSubscriptionPlanInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutLabSubscriptionPlanInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutLabSubscriptionPlanInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutLabSubscriptionPlanInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutLabSubscriptionPlanInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutLabSubscriptionPlanInput>;
export const LabCreateOrConnectWithoutLabSubscriptionPlanInputObjectZodSchema = makeSchema();
