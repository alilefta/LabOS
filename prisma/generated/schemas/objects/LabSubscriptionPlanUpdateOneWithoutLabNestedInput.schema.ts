import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabSubscriptionPlanCreateWithoutLabInputObjectSchema as LabSubscriptionPlanCreateWithoutLabInputObjectSchema } from './LabSubscriptionPlanCreateWithoutLabInput.schema';
import { LabSubscriptionPlanUncheckedCreateWithoutLabInputObjectSchema as LabSubscriptionPlanUncheckedCreateWithoutLabInputObjectSchema } from './LabSubscriptionPlanUncheckedCreateWithoutLabInput.schema';
import { LabSubscriptionPlanCreateOrConnectWithoutLabInputObjectSchema as LabSubscriptionPlanCreateOrConnectWithoutLabInputObjectSchema } from './LabSubscriptionPlanCreateOrConnectWithoutLabInput.schema';
import { LabSubscriptionPlanUpsertWithoutLabInputObjectSchema as LabSubscriptionPlanUpsertWithoutLabInputObjectSchema } from './LabSubscriptionPlanUpsertWithoutLabInput.schema';
import { LabSubscriptionPlanWhereInputObjectSchema as LabSubscriptionPlanWhereInputObjectSchema } from './LabSubscriptionPlanWhereInput.schema';
import { LabSubscriptionPlanWhereUniqueInputObjectSchema as LabSubscriptionPlanWhereUniqueInputObjectSchema } from './LabSubscriptionPlanWhereUniqueInput.schema';
import { LabSubscriptionPlanUpdateToOneWithWhereWithoutLabInputObjectSchema as LabSubscriptionPlanUpdateToOneWithWhereWithoutLabInputObjectSchema } from './LabSubscriptionPlanUpdateToOneWithWhereWithoutLabInput.schema';
import { LabSubscriptionPlanUpdateWithoutLabInputObjectSchema as LabSubscriptionPlanUpdateWithoutLabInputObjectSchema } from './LabSubscriptionPlanUpdateWithoutLabInput.schema';
import { LabSubscriptionPlanUncheckedUpdateWithoutLabInputObjectSchema as LabSubscriptionPlanUncheckedUpdateWithoutLabInputObjectSchema } from './LabSubscriptionPlanUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabSubscriptionPlanCreateWithoutLabInputObjectSchema), z.lazy(() => LabSubscriptionPlanUncheckedCreateWithoutLabInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabSubscriptionPlanCreateOrConnectWithoutLabInputObjectSchema).optional(),
  upsert: z.lazy(() => LabSubscriptionPlanUpsertWithoutLabInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => LabSubscriptionPlanWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => LabSubscriptionPlanWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => LabSubscriptionPlanWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabSubscriptionPlanUpdateToOneWithWhereWithoutLabInputObjectSchema), z.lazy(() => LabSubscriptionPlanUpdateWithoutLabInputObjectSchema), z.lazy(() => LabSubscriptionPlanUncheckedUpdateWithoutLabInputObjectSchema)]).optional()
}).strict();
export const LabSubscriptionPlanUpdateOneWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanUpdateOneWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanUpdateOneWithoutLabNestedInput>;
export const LabSubscriptionPlanUpdateOneWithoutLabNestedInputObjectZodSchema = makeSchema();
