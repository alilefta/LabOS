import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateWithoutCasePricingPlanInputObjectSchema as CaseWorkItemCreateWithoutCasePricingPlanInputObjectSchema } from './CaseWorkItemCreateWithoutCasePricingPlanInput.schema';
import { CaseWorkItemUncheckedCreateWithoutCasePricingPlanInputObjectSchema as CaseWorkItemUncheckedCreateWithoutCasePricingPlanInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutCasePricingPlanInput.schema';
import { CaseWorkItemCreateOrConnectWithoutCasePricingPlanInputObjectSchema as CaseWorkItemCreateOrConnectWithoutCasePricingPlanInputObjectSchema } from './CaseWorkItemCreateOrConnectWithoutCasePricingPlanInput.schema';
import { CaseWorkItemCreateManyCasePricingPlanInputEnvelopeObjectSchema as CaseWorkItemCreateManyCasePricingPlanInputEnvelopeObjectSchema } from './CaseWorkItemCreateManyCasePricingPlanInputEnvelope.schema';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutCasePricingPlanInputObjectSchema), z.lazy(() => CaseWorkItemCreateWithoutCasePricingPlanInputObjectSchema).array(), z.lazy(() => CaseWorkItemUncheckedCreateWithoutCasePricingPlanInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutCasePricingPlanInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseWorkItemCreateOrConnectWithoutCasePricingPlanInputObjectSchema), z.lazy(() => CaseWorkItemCreateOrConnectWithoutCasePricingPlanInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseWorkItemCreateManyCasePricingPlanInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseWorkItemUncheckedCreateNestedManyWithoutCasePricingPlanInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUncheckedCreateNestedManyWithoutCasePricingPlanInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUncheckedCreateNestedManyWithoutCasePricingPlanInput>;
export const CaseWorkItemUncheckedCreateNestedManyWithoutCasePricingPlanInputObjectZodSchema = makeSchema();
