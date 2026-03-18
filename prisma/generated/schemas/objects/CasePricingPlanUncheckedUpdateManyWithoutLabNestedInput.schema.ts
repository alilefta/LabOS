import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanCreateWithoutLabInputObjectSchema as CasePricingPlanCreateWithoutLabInputObjectSchema } from './CasePricingPlanCreateWithoutLabInput.schema';
import { CasePricingPlanUncheckedCreateWithoutLabInputObjectSchema as CasePricingPlanUncheckedCreateWithoutLabInputObjectSchema } from './CasePricingPlanUncheckedCreateWithoutLabInput.schema';
import { CasePricingPlanCreateOrConnectWithoutLabInputObjectSchema as CasePricingPlanCreateOrConnectWithoutLabInputObjectSchema } from './CasePricingPlanCreateOrConnectWithoutLabInput.schema';
import { CasePricingPlanUpsertWithWhereUniqueWithoutLabInputObjectSchema as CasePricingPlanUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './CasePricingPlanUpsertWithWhereUniqueWithoutLabInput.schema';
import { CasePricingPlanCreateManyLabInputEnvelopeObjectSchema as CasePricingPlanCreateManyLabInputEnvelopeObjectSchema } from './CasePricingPlanCreateManyLabInputEnvelope.schema';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './CasePricingPlanWhereUniqueInput.schema';
import { CasePricingPlanUpdateWithWhereUniqueWithoutLabInputObjectSchema as CasePricingPlanUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './CasePricingPlanUpdateWithWhereUniqueWithoutLabInput.schema';
import { CasePricingPlanUpdateManyWithWhereWithoutLabInputObjectSchema as CasePricingPlanUpdateManyWithWhereWithoutLabInputObjectSchema } from './CasePricingPlanUpdateManyWithWhereWithoutLabInput.schema';
import { CasePricingPlanScalarWhereInputObjectSchema as CasePricingPlanScalarWhereInputObjectSchema } from './CasePricingPlanScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CasePricingPlanCreateWithoutLabInputObjectSchema), z.lazy(() => CasePricingPlanCreateWithoutLabInputObjectSchema).array(), z.lazy(() => CasePricingPlanUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CasePricingPlanCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => CasePricingPlanCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CasePricingPlanUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => CasePricingPlanUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CasePricingPlanCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema), z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema), z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema), z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema), z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CasePricingPlanUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => CasePricingPlanUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CasePricingPlanUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => CasePricingPlanUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CasePricingPlanScalarWhereInputObjectSchema), z.lazy(() => CasePricingPlanScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CasePricingPlanUncheckedUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.CasePricingPlanUncheckedUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanUncheckedUpdateManyWithoutLabNestedInput>;
export const CasePricingPlanUncheckedUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();
