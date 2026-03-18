import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemCreateWithoutCasePricingPlanInputObjectSchema as CaseWorkItemCreateWithoutCasePricingPlanInputObjectSchema } from './CaseWorkItemCreateWithoutCasePricingPlanInput.schema';
import { CaseWorkItemUncheckedCreateWithoutCasePricingPlanInputObjectSchema as CaseWorkItemUncheckedCreateWithoutCasePricingPlanInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutCasePricingPlanInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutCasePricingPlanInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutCasePricingPlanInputObjectSchema)])
}).strict();
export const CaseWorkItemCreateOrConnectWithoutCasePricingPlanInputObjectSchema: z.ZodType<Prisma.CaseWorkItemCreateOrConnectWithoutCasePricingPlanInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCreateOrConnectWithoutCasePricingPlanInput>;
export const CaseWorkItemCreateOrConnectWithoutCasePricingPlanInputObjectZodSchema = makeSchema();
