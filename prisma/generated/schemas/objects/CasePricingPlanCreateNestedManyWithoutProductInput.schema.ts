import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanCreateWithoutProductInputObjectSchema as CasePricingPlanCreateWithoutProductInputObjectSchema } from './CasePricingPlanCreateWithoutProductInput.schema';
import { CasePricingPlanUncheckedCreateWithoutProductInputObjectSchema as CasePricingPlanUncheckedCreateWithoutProductInputObjectSchema } from './CasePricingPlanUncheckedCreateWithoutProductInput.schema';
import { CasePricingPlanCreateOrConnectWithoutProductInputObjectSchema as CasePricingPlanCreateOrConnectWithoutProductInputObjectSchema } from './CasePricingPlanCreateOrConnectWithoutProductInput.schema';
import { CasePricingPlanCreateManyProductInputEnvelopeObjectSchema as CasePricingPlanCreateManyProductInputEnvelopeObjectSchema } from './CasePricingPlanCreateManyProductInputEnvelope.schema';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './CasePricingPlanWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CasePricingPlanCreateWithoutProductInputObjectSchema), z.lazy(() => CasePricingPlanCreateWithoutProductInputObjectSchema).array(), z.lazy(() => CasePricingPlanUncheckedCreateWithoutProductInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedCreateWithoutProductInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CasePricingPlanCreateOrConnectWithoutProductInputObjectSchema), z.lazy(() => CasePricingPlanCreateOrConnectWithoutProductInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CasePricingPlanCreateManyProductInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema), z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CasePricingPlanCreateNestedManyWithoutProductInputObjectSchema: z.ZodType<Prisma.CasePricingPlanCreateNestedManyWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanCreateNestedManyWithoutProductInput>;
export const CasePricingPlanCreateNestedManyWithoutProductInputObjectZodSchema = makeSchema();
