import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanScalarWhereInputObjectSchema as CasePricingPlanScalarWhereInputObjectSchema } from './CasePricingPlanScalarWhereInput.schema';
import { CasePricingPlanUpdateManyMutationInputObjectSchema as CasePricingPlanUpdateManyMutationInputObjectSchema } from './CasePricingPlanUpdateManyMutationInput.schema';
import { CasePricingPlanUncheckedUpdateManyWithoutClinicInputObjectSchema as CasePricingPlanUncheckedUpdateManyWithoutClinicInputObjectSchema } from './CasePricingPlanUncheckedUpdateManyWithoutClinicInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CasePricingPlanScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CasePricingPlanUpdateManyMutationInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedUpdateManyWithoutClinicInputObjectSchema)])
}).strict();
export const CasePricingPlanUpdateManyWithWhereWithoutClinicInputObjectSchema: z.ZodType<Prisma.CasePricingPlanUpdateManyWithWhereWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanUpdateManyWithWhereWithoutClinicInput>;
export const CasePricingPlanUpdateManyWithWhereWithoutClinicInputObjectZodSchema = makeSchema();
