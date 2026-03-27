import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanCreateWithoutClinicInputObjectSchema as CasePricingPlanCreateWithoutClinicInputObjectSchema } from './CasePricingPlanCreateWithoutClinicInput.schema';
import { CasePricingPlanUncheckedCreateWithoutClinicInputObjectSchema as CasePricingPlanUncheckedCreateWithoutClinicInputObjectSchema } from './CasePricingPlanUncheckedCreateWithoutClinicInput.schema';
import { CasePricingPlanCreateOrConnectWithoutClinicInputObjectSchema as CasePricingPlanCreateOrConnectWithoutClinicInputObjectSchema } from './CasePricingPlanCreateOrConnectWithoutClinicInput.schema';
import { CasePricingPlanCreateManyClinicInputEnvelopeObjectSchema as CasePricingPlanCreateManyClinicInputEnvelopeObjectSchema } from './CasePricingPlanCreateManyClinicInputEnvelope.schema';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './CasePricingPlanWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CasePricingPlanCreateWithoutClinicInputObjectSchema), z.lazy(() => CasePricingPlanCreateWithoutClinicInputObjectSchema).array(), z.lazy(() => CasePricingPlanUncheckedCreateWithoutClinicInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedCreateWithoutClinicInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CasePricingPlanCreateOrConnectWithoutClinicInputObjectSchema), z.lazy(() => CasePricingPlanCreateOrConnectWithoutClinicInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CasePricingPlanCreateManyClinicInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema), z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CasePricingPlanUncheckedCreateNestedManyWithoutClinicInputObjectSchema: z.ZodType<Prisma.CasePricingPlanUncheckedCreateNestedManyWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanUncheckedCreateNestedManyWithoutClinicInput>;
export const CasePricingPlanUncheckedCreateNestedManyWithoutClinicInputObjectZodSchema = makeSchema();
