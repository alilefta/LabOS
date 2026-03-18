import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemScalarWhereInputObjectSchema as CaseWorkItemScalarWhereInputObjectSchema } from './CaseWorkItemScalarWhereInput.schema';
import { CaseWorkItemUpdateManyMutationInputObjectSchema as CaseWorkItemUpdateManyMutationInputObjectSchema } from './CaseWorkItemUpdateManyMutationInput.schema';
import { CaseWorkItemUncheckedUpdateManyWithoutCasePricingPlanInputObjectSchema as CaseWorkItemUncheckedUpdateManyWithoutCasePricingPlanInputObjectSchema } from './CaseWorkItemUncheckedUpdateManyWithoutCasePricingPlanInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseWorkItemUpdateManyMutationInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateManyWithoutCasePricingPlanInputObjectSchema)])
}).strict();
export const CaseWorkItemUpdateManyWithWhereWithoutCasePricingPlanInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpdateManyWithWhereWithoutCasePricingPlanInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpdateManyWithWhereWithoutCasePricingPlanInput>;
export const CaseWorkItemUpdateManyWithWhereWithoutCasePricingPlanInputObjectZodSchema = makeSchema();
