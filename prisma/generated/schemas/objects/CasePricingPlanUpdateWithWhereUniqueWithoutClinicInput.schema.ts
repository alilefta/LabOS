import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './CasePricingPlanWhereUniqueInput.schema';
import { CasePricingPlanUpdateWithoutClinicInputObjectSchema as CasePricingPlanUpdateWithoutClinicInputObjectSchema } from './CasePricingPlanUpdateWithoutClinicInput.schema';
import { CasePricingPlanUncheckedUpdateWithoutClinicInputObjectSchema as CasePricingPlanUncheckedUpdateWithoutClinicInputObjectSchema } from './CasePricingPlanUncheckedUpdateWithoutClinicInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CasePricingPlanUpdateWithoutClinicInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedUpdateWithoutClinicInputObjectSchema)])
}).strict();
export const CasePricingPlanUpdateWithWhereUniqueWithoutClinicInputObjectSchema: z.ZodType<Prisma.CasePricingPlanUpdateWithWhereUniqueWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanUpdateWithWhereUniqueWithoutClinicInput>;
export const CasePricingPlanUpdateWithWhereUniqueWithoutClinicInputObjectZodSchema = makeSchema();
