import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanScalarWhereInputObjectSchema as CasePricingPlanScalarWhereInputObjectSchema } from './CasePricingPlanScalarWhereInput.schema';
import { CasePricingPlanUpdateManyMutationInputObjectSchema as CasePricingPlanUpdateManyMutationInputObjectSchema } from './CasePricingPlanUpdateManyMutationInput.schema';
import { CasePricingPlanUncheckedUpdateManyWithoutProductInputObjectSchema as CasePricingPlanUncheckedUpdateManyWithoutProductInputObjectSchema } from './CasePricingPlanUncheckedUpdateManyWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CasePricingPlanScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CasePricingPlanUpdateManyMutationInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedUpdateManyWithoutProductInputObjectSchema)])
}).strict();
export const CasePricingPlanUpdateManyWithWhereWithoutProductInputObjectSchema: z.ZodType<Prisma.CasePricingPlanUpdateManyWithWhereWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanUpdateManyWithWhereWithoutProductInput>;
export const CasePricingPlanUpdateManyWithWhereWithoutProductInputObjectZodSchema = makeSchema();
