import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanCreateWithoutLabInputObjectSchema as CasePricingPlanCreateWithoutLabInputObjectSchema } from './CasePricingPlanCreateWithoutLabInput.schema';
import { CasePricingPlanUncheckedCreateWithoutLabInputObjectSchema as CasePricingPlanUncheckedCreateWithoutLabInputObjectSchema } from './CasePricingPlanUncheckedCreateWithoutLabInput.schema';
import { CasePricingPlanCreateOrConnectWithoutLabInputObjectSchema as CasePricingPlanCreateOrConnectWithoutLabInputObjectSchema } from './CasePricingPlanCreateOrConnectWithoutLabInput.schema';
import { CasePricingPlanCreateManyLabInputEnvelopeObjectSchema as CasePricingPlanCreateManyLabInputEnvelopeObjectSchema } from './CasePricingPlanCreateManyLabInputEnvelope.schema';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './CasePricingPlanWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CasePricingPlanCreateWithoutLabInputObjectSchema), z.lazy(() => CasePricingPlanCreateWithoutLabInputObjectSchema).array(), z.lazy(() => CasePricingPlanUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CasePricingPlanCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => CasePricingPlanCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CasePricingPlanCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema), z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CasePricingPlanUncheckedCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.CasePricingPlanUncheckedCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanUncheckedCreateNestedManyWithoutLabInput>;
export const CasePricingPlanUncheckedCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
