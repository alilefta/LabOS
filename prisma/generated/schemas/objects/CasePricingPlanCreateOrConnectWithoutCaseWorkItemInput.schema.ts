import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './CasePricingPlanWhereUniqueInput.schema';
import { CasePricingPlanCreateWithoutCaseWorkItemInputObjectSchema as CasePricingPlanCreateWithoutCaseWorkItemInputObjectSchema } from './CasePricingPlanCreateWithoutCaseWorkItemInput.schema';
import { CasePricingPlanUncheckedCreateWithoutCaseWorkItemInputObjectSchema as CasePricingPlanUncheckedCreateWithoutCaseWorkItemInputObjectSchema } from './CasePricingPlanUncheckedCreateWithoutCaseWorkItemInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CasePricingPlanCreateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedCreateWithoutCaseWorkItemInputObjectSchema)])
}).strict();
export const CasePricingPlanCreateOrConnectWithoutCaseWorkItemInputObjectSchema: z.ZodType<Prisma.CasePricingPlanCreateOrConnectWithoutCaseWorkItemInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanCreateOrConnectWithoutCaseWorkItemInput>;
export const CasePricingPlanCreateOrConnectWithoutCaseWorkItemInputObjectZodSchema = makeSchema();
