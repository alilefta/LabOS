import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemUpdateWithoutCasePricingPlanInputObjectSchema as CaseWorkItemUpdateWithoutCasePricingPlanInputObjectSchema } from './CaseWorkItemUpdateWithoutCasePricingPlanInput.schema';
import { CaseWorkItemUncheckedUpdateWithoutCasePricingPlanInputObjectSchema as CaseWorkItemUncheckedUpdateWithoutCasePricingPlanInputObjectSchema } from './CaseWorkItemUncheckedUpdateWithoutCasePricingPlanInput.schema';
import { CaseWorkItemCreateWithoutCasePricingPlanInputObjectSchema as CaseWorkItemCreateWithoutCasePricingPlanInputObjectSchema } from './CaseWorkItemCreateWithoutCasePricingPlanInput.schema';
import { CaseWorkItemUncheckedCreateWithoutCasePricingPlanInputObjectSchema as CaseWorkItemUncheckedCreateWithoutCasePricingPlanInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutCasePricingPlanInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseWorkItemUpdateWithoutCasePricingPlanInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateWithoutCasePricingPlanInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutCasePricingPlanInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutCasePricingPlanInputObjectSchema)])
}).strict();
export const CaseWorkItemUpsertWithWhereUniqueWithoutCasePricingPlanInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpsertWithWhereUniqueWithoutCasePricingPlanInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpsertWithWhereUniqueWithoutCasePricingPlanInput>;
export const CaseWorkItemUpsertWithWhereUniqueWithoutCasePricingPlanInputObjectZodSchema = makeSchema();
