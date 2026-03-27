import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanCreateWithoutProductInputObjectSchema as CasePricingPlanCreateWithoutProductInputObjectSchema } from './CasePricingPlanCreateWithoutProductInput.schema';
import { CasePricingPlanUncheckedCreateWithoutProductInputObjectSchema as CasePricingPlanUncheckedCreateWithoutProductInputObjectSchema } from './CasePricingPlanUncheckedCreateWithoutProductInput.schema';
import { CasePricingPlanCreateOrConnectWithoutProductInputObjectSchema as CasePricingPlanCreateOrConnectWithoutProductInputObjectSchema } from './CasePricingPlanCreateOrConnectWithoutProductInput.schema';
import { CasePricingPlanUpsertWithWhereUniqueWithoutProductInputObjectSchema as CasePricingPlanUpsertWithWhereUniqueWithoutProductInputObjectSchema } from './CasePricingPlanUpsertWithWhereUniqueWithoutProductInput.schema';
import { CasePricingPlanCreateManyProductInputEnvelopeObjectSchema as CasePricingPlanCreateManyProductInputEnvelopeObjectSchema } from './CasePricingPlanCreateManyProductInputEnvelope.schema';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './CasePricingPlanWhereUniqueInput.schema';
import { CasePricingPlanUpdateWithWhereUniqueWithoutProductInputObjectSchema as CasePricingPlanUpdateWithWhereUniqueWithoutProductInputObjectSchema } from './CasePricingPlanUpdateWithWhereUniqueWithoutProductInput.schema';
import { CasePricingPlanUpdateManyWithWhereWithoutProductInputObjectSchema as CasePricingPlanUpdateManyWithWhereWithoutProductInputObjectSchema } from './CasePricingPlanUpdateManyWithWhereWithoutProductInput.schema';
import { CasePricingPlanScalarWhereInputObjectSchema as CasePricingPlanScalarWhereInputObjectSchema } from './CasePricingPlanScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CasePricingPlanCreateWithoutProductInputObjectSchema), z.lazy(() => CasePricingPlanCreateWithoutProductInputObjectSchema).array(), z.lazy(() => CasePricingPlanUncheckedCreateWithoutProductInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedCreateWithoutProductInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CasePricingPlanCreateOrConnectWithoutProductInputObjectSchema), z.lazy(() => CasePricingPlanCreateOrConnectWithoutProductInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CasePricingPlanUpsertWithWhereUniqueWithoutProductInputObjectSchema), z.lazy(() => CasePricingPlanUpsertWithWhereUniqueWithoutProductInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CasePricingPlanCreateManyProductInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema), z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema), z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema), z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema), z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CasePricingPlanUpdateWithWhereUniqueWithoutProductInputObjectSchema), z.lazy(() => CasePricingPlanUpdateWithWhereUniqueWithoutProductInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CasePricingPlanUpdateManyWithWhereWithoutProductInputObjectSchema), z.lazy(() => CasePricingPlanUpdateManyWithWhereWithoutProductInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CasePricingPlanScalarWhereInputObjectSchema), z.lazy(() => CasePricingPlanScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CasePricingPlanUpdateManyWithoutProductNestedInputObjectSchema: z.ZodType<Prisma.CasePricingPlanUpdateManyWithoutProductNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanUpdateManyWithoutProductNestedInput>;
export const CasePricingPlanUpdateManyWithoutProductNestedInputObjectZodSchema = makeSchema();
