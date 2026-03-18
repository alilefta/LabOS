import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanCreateWithoutCaseWorkItemInputObjectSchema as CasePricingPlanCreateWithoutCaseWorkItemInputObjectSchema } from './CasePricingPlanCreateWithoutCaseWorkItemInput.schema';
import { CasePricingPlanUncheckedCreateWithoutCaseWorkItemInputObjectSchema as CasePricingPlanUncheckedCreateWithoutCaseWorkItemInputObjectSchema } from './CasePricingPlanUncheckedCreateWithoutCaseWorkItemInput.schema';
import { CasePricingPlanCreateOrConnectWithoutCaseWorkItemInputObjectSchema as CasePricingPlanCreateOrConnectWithoutCaseWorkItemInputObjectSchema } from './CasePricingPlanCreateOrConnectWithoutCaseWorkItemInput.schema';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './CasePricingPlanWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CasePricingPlanCreateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedCreateWithoutCaseWorkItemInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CasePricingPlanCreateOrConnectWithoutCaseWorkItemInputObjectSchema).optional(),
  connect: z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema).optional()
}).strict();
export const CasePricingPlanCreateNestedOneWithoutCaseWorkItemInputObjectSchema: z.ZodType<Prisma.CasePricingPlanCreateNestedOneWithoutCaseWorkItemInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanCreateNestedOneWithoutCaseWorkItemInput>;
export const CasePricingPlanCreateNestedOneWithoutCaseWorkItemInputObjectZodSchema = makeSchema();
