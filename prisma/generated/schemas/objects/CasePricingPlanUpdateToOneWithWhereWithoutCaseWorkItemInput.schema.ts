import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanWhereInputObjectSchema as CasePricingPlanWhereInputObjectSchema } from './CasePricingPlanWhereInput.schema';
import { CasePricingPlanUpdateWithoutCaseWorkItemInputObjectSchema as CasePricingPlanUpdateWithoutCaseWorkItemInputObjectSchema } from './CasePricingPlanUpdateWithoutCaseWorkItemInput.schema';
import { CasePricingPlanUncheckedUpdateWithoutCaseWorkItemInputObjectSchema as CasePricingPlanUncheckedUpdateWithoutCaseWorkItemInputObjectSchema } from './CasePricingPlanUncheckedUpdateWithoutCaseWorkItemInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CasePricingPlanWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CasePricingPlanUpdateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedUpdateWithoutCaseWorkItemInputObjectSchema)])
}).strict();
export const CasePricingPlanUpdateToOneWithWhereWithoutCaseWorkItemInputObjectSchema: z.ZodType<Prisma.CasePricingPlanUpdateToOneWithWhereWithoutCaseWorkItemInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanUpdateToOneWithWhereWithoutCaseWorkItemInput>;
export const CasePricingPlanUpdateToOneWithWhereWithoutCaseWorkItemInputObjectZodSchema = makeSchema();
