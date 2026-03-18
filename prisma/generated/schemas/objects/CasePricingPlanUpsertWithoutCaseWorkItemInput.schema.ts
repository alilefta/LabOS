import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanUpdateWithoutCaseWorkItemInputObjectSchema as CasePricingPlanUpdateWithoutCaseWorkItemInputObjectSchema } from './CasePricingPlanUpdateWithoutCaseWorkItemInput.schema';
import { CasePricingPlanUncheckedUpdateWithoutCaseWorkItemInputObjectSchema as CasePricingPlanUncheckedUpdateWithoutCaseWorkItemInputObjectSchema } from './CasePricingPlanUncheckedUpdateWithoutCaseWorkItemInput.schema';
import { CasePricingPlanCreateWithoutCaseWorkItemInputObjectSchema as CasePricingPlanCreateWithoutCaseWorkItemInputObjectSchema } from './CasePricingPlanCreateWithoutCaseWorkItemInput.schema';
import { CasePricingPlanUncheckedCreateWithoutCaseWorkItemInputObjectSchema as CasePricingPlanUncheckedCreateWithoutCaseWorkItemInputObjectSchema } from './CasePricingPlanUncheckedCreateWithoutCaseWorkItemInput.schema';
import { CasePricingPlanWhereInputObjectSchema as CasePricingPlanWhereInputObjectSchema } from './CasePricingPlanWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CasePricingPlanUpdateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedUpdateWithoutCaseWorkItemInputObjectSchema)]),
  create: z.union([z.lazy(() => CasePricingPlanCreateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedCreateWithoutCaseWorkItemInputObjectSchema)]),
  where: z.lazy(() => CasePricingPlanWhereInputObjectSchema).optional()
}).strict();
export const CasePricingPlanUpsertWithoutCaseWorkItemInputObjectSchema: z.ZodType<Prisma.CasePricingPlanUpsertWithoutCaseWorkItemInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanUpsertWithoutCaseWorkItemInput>;
export const CasePricingPlanUpsertWithoutCaseWorkItemInputObjectZodSchema = makeSchema();
