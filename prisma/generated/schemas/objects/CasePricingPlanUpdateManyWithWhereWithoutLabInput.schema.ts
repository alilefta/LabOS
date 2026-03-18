import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanScalarWhereInputObjectSchema as CasePricingPlanScalarWhereInputObjectSchema } from './CasePricingPlanScalarWhereInput.schema';
import { CasePricingPlanUpdateManyMutationInputObjectSchema as CasePricingPlanUpdateManyMutationInputObjectSchema } from './CasePricingPlanUpdateManyMutationInput.schema';
import { CasePricingPlanUncheckedUpdateManyWithoutLabInputObjectSchema as CasePricingPlanUncheckedUpdateManyWithoutLabInputObjectSchema } from './CasePricingPlanUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CasePricingPlanScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CasePricingPlanUpdateManyMutationInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const CasePricingPlanUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.CasePricingPlanUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanUpdateManyWithWhereWithoutLabInput>;
export const CasePricingPlanUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
