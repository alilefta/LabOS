import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemUpdateWithoutCasePricingPlanInputObjectSchema as CaseWorkItemUpdateWithoutCasePricingPlanInputObjectSchema } from './CaseWorkItemUpdateWithoutCasePricingPlanInput.schema';
import { CaseWorkItemUncheckedUpdateWithoutCasePricingPlanInputObjectSchema as CaseWorkItemUncheckedUpdateWithoutCasePricingPlanInputObjectSchema } from './CaseWorkItemUncheckedUpdateWithoutCasePricingPlanInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseWorkItemUpdateWithoutCasePricingPlanInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateWithoutCasePricingPlanInputObjectSchema)])
}).strict();
export const CaseWorkItemUpdateWithWhereUniqueWithoutCasePricingPlanInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpdateWithWhereUniqueWithoutCasePricingPlanInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpdateWithWhereUniqueWithoutCasePricingPlanInput>;
export const CaseWorkItemUpdateWithWhereUniqueWithoutCasePricingPlanInputObjectZodSchema = makeSchema();
