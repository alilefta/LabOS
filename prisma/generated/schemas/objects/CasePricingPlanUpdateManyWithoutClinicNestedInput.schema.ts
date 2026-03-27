import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanCreateWithoutClinicInputObjectSchema as CasePricingPlanCreateWithoutClinicInputObjectSchema } from './CasePricingPlanCreateWithoutClinicInput.schema';
import { CasePricingPlanUncheckedCreateWithoutClinicInputObjectSchema as CasePricingPlanUncheckedCreateWithoutClinicInputObjectSchema } from './CasePricingPlanUncheckedCreateWithoutClinicInput.schema';
import { CasePricingPlanCreateOrConnectWithoutClinicInputObjectSchema as CasePricingPlanCreateOrConnectWithoutClinicInputObjectSchema } from './CasePricingPlanCreateOrConnectWithoutClinicInput.schema';
import { CasePricingPlanUpsertWithWhereUniqueWithoutClinicInputObjectSchema as CasePricingPlanUpsertWithWhereUniqueWithoutClinicInputObjectSchema } from './CasePricingPlanUpsertWithWhereUniqueWithoutClinicInput.schema';
import { CasePricingPlanCreateManyClinicInputEnvelopeObjectSchema as CasePricingPlanCreateManyClinicInputEnvelopeObjectSchema } from './CasePricingPlanCreateManyClinicInputEnvelope.schema';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './CasePricingPlanWhereUniqueInput.schema';
import { CasePricingPlanUpdateWithWhereUniqueWithoutClinicInputObjectSchema as CasePricingPlanUpdateWithWhereUniqueWithoutClinicInputObjectSchema } from './CasePricingPlanUpdateWithWhereUniqueWithoutClinicInput.schema';
import { CasePricingPlanUpdateManyWithWhereWithoutClinicInputObjectSchema as CasePricingPlanUpdateManyWithWhereWithoutClinicInputObjectSchema } from './CasePricingPlanUpdateManyWithWhereWithoutClinicInput.schema';
import { CasePricingPlanScalarWhereInputObjectSchema as CasePricingPlanScalarWhereInputObjectSchema } from './CasePricingPlanScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CasePricingPlanCreateWithoutClinicInputObjectSchema), z.lazy(() => CasePricingPlanCreateWithoutClinicInputObjectSchema).array(), z.lazy(() => CasePricingPlanUncheckedCreateWithoutClinicInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedCreateWithoutClinicInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CasePricingPlanCreateOrConnectWithoutClinicInputObjectSchema), z.lazy(() => CasePricingPlanCreateOrConnectWithoutClinicInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CasePricingPlanUpsertWithWhereUniqueWithoutClinicInputObjectSchema), z.lazy(() => CasePricingPlanUpsertWithWhereUniqueWithoutClinicInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CasePricingPlanCreateManyClinicInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema), z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema), z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema), z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema), z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CasePricingPlanUpdateWithWhereUniqueWithoutClinicInputObjectSchema), z.lazy(() => CasePricingPlanUpdateWithWhereUniqueWithoutClinicInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CasePricingPlanUpdateManyWithWhereWithoutClinicInputObjectSchema), z.lazy(() => CasePricingPlanUpdateManyWithWhereWithoutClinicInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CasePricingPlanScalarWhereInputObjectSchema), z.lazy(() => CasePricingPlanScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CasePricingPlanUpdateManyWithoutClinicNestedInputObjectSchema: z.ZodType<Prisma.CasePricingPlanUpdateManyWithoutClinicNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanUpdateManyWithoutClinicNestedInput>;
export const CasePricingPlanUpdateManyWithoutClinicNestedInputObjectZodSchema = makeSchema();
