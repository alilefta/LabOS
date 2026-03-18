import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateWithoutCasePricingPlanInputObjectSchema as CaseWorkItemCreateWithoutCasePricingPlanInputObjectSchema } from './CaseWorkItemCreateWithoutCasePricingPlanInput.schema';
import { CaseWorkItemUncheckedCreateWithoutCasePricingPlanInputObjectSchema as CaseWorkItemUncheckedCreateWithoutCasePricingPlanInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutCasePricingPlanInput.schema';
import { CaseWorkItemCreateOrConnectWithoutCasePricingPlanInputObjectSchema as CaseWorkItemCreateOrConnectWithoutCasePricingPlanInputObjectSchema } from './CaseWorkItemCreateOrConnectWithoutCasePricingPlanInput.schema';
import { CaseWorkItemUpsertWithWhereUniqueWithoutCasePricingPlanInputObjectSchema as CaseWorkItemUpsertWithWhereUniqueWithoutCasePricingPlanInputObjectSchema } from './CaseWorkItemUpsertWithWhereUniqueWithoutCasePricingPlanInput.schema';
import { CaseWorkItemCreateManyCasePricingPlanInputEnvelopeObjectSchema as CaseWorkItemCreateManyCasePricingPlanInputEnvelopeObjectSchema } from './CaseWorkItemCreateManyCasePricingPlanInputEnvelope.schema';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemUpdateWithWhereUniqueWithoutCasePricingPlanInputObjectSchema as CaseWorkItemUpdateWithWhereUniqueWithoutCasePricingPlanInputObjectSchema } from './CaseWorkItemUpdateWithWhereUniqueWithoutCasePricingPlanInput.schema';
import { CaseWorkItemUpdateManyWithWhereWithoutCasePricingPlanInputObjectSchema as CaseWorkItemUpdateManyWithWhereWithoutCasePricingPlanInputObjectSchema } from './CaseWorkItemUpdateManyWithWhereWithoutCasePricingPlanInput.schema';
import { CaseWorkItemScalarWhereInputObjectSchema as CaseWorkItemScalarWhereInputObjectSchema } from './CaseWorkItemScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutCasePricingPlanInputObjectSchema), z.lazy(() => CaseWorkItemCreateWithoutCasePricingPlanInputObjectSchema).array(), z.lazy(() => CaseWorkItemUncheckedCreateWithoutCasePricingPlanInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutCasePricingPlanInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseWorkItemCreateOrConnectWithoutCasePricingPlanInputObjectSchema), z.lazy(() => CaseWorkItemCreateOrConnectWithoutCasePricingPlanInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseWorkItemUpsertWithWhereUniqueWithoutCasePricingPlanInputObjectSchema), z.lazy(() => CaseWorkItemUpsertWithWhereUniqueWithoutCasePricingPlanInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseWorkItemCreateManyCasePricingPlanInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseWorkItemUpdateWithWhereUniqueWithoutCasePricingPlanInputObjectSchema), z.lazy(() => CaseWorkItemUpdateWithWhereUniqueWithoutCasePricingPlanInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseWorkItemUpdateManyWithWhereWithoutCasePricingPlanInputObjectSchema), z.lazy(() => CaseWorkItemUpdateManyWithWhereWithoutCasePricingPlanInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseWorkItemScalarWhereInputObjectSchema), z.lazy(() => CaseWorkItemScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseWorkItemUpdateManyWithoutCasePricingPlanNestedInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpdateManyWithoutCasePricingPlanNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpdateManyWithoutCasePricingPlanNestedInput>;
export const CaseWorkItemUpdateManyWithoutCasePricingPlanNestedInputObjectZodSchema = makeSchema();
