import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutLabSubscriptionPlanInputObjectSchema as LabCreateWithoutLabSubscriptionPlanInputObjectSchema } from './LabCreateWithoutLabSubscriptionPlanInput.schema';
import { LabUncheckedCreateWithoutLabSubscriptionPlanInputObjectSchema as LabUncheckedCreateWithoutLabSubscriptionPlanInputObjectSchema } from './LabUncheckedCreateWithoutLabSubscriptionPlanInput.schema';
import { LabCreateOrConnectWithoutLabSubscriptionPlanInputObjectSchema as LabCreateOrConnectWithoutLabSubscriptionPlanInputObjectSchema } from './LabCreateOrConnectWithoutLabSubscriptionPlanInput.schema';
import { LabUpsertWithoutLabSubscriptionPlanInputObjectSchema as LabUpsertWithoutLabSubscriptionPlanInputObjectSchema } from './LabUpsertWithoutLabSubscriptionPlanInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutLabSubscriptionPlanInputObjectSchema as LabUpdateToOneWithWhereWithoutLabSubscriptionPlanInputObjectSchema } from './LabUpdateToOneWithWhereWithoutLabSubscriptionPlanInput.schema';
import { LabUpdateWithoutLabSubscriptionPlanInputObjectSchema as LabUpdateWithoutLabSubscriptionPlanInputObjectSchema } from './LabUpdateWithoutLabSubscriptionPlanInput.schema';
import { LabUncheckedUpdateWithoutLabSubscriptionPlanInputObjectSchema as LabUncheckedUpdateWithoutLabSubscriptionPlanInputObjectSchema } from './LabUncheckedUpdateWithoutLabSubscriptionPlanInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutLabSubscriptionPlanInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutLabSubscriptionPlanInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutLabSubscriptionPlanInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutLabSubscriptionPlanInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutLabSubscriptionPlanInputObjectSchema), z.lazy(() => LabUpdateWithoutLabSubscriptionPlanInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutLabSubscriptionPlanInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutLabSubscriptionPlanNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutLabSubscriptionPlanNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutLabSubscriptionPlanNestedInput>;
export const LabUpdateOneRequiredWithoutLabSubscriptionPlanNestedInputObjectZodSchema = makeSchema();
