import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './CasePricingPlanWhereUniqueInput.schema';
import { CasePricingPlanUpdateWithoutClinicInputObjectSchema as CasePricingPlanUpdateWithoutClinicInputObjectSchema } from './CasePricingPlanUpdateWithoutClinicInput.schema';
import { CasePricingPlanUncheckedUpdateWithoutClinicInputObjectSchema as CasePricingPlanUncheckedUpdateWithoutClinicInputObjectSchema } from './CasePricingPlanUncheckedUpdateWithoutClinicInput.schema';
import { CasePricingPlanCreateWithoutClinicInputObjectSchema as CasePricingPlanCreateWithoutClinicInputObjectSchema } from './CasePricingPlanCreateWithoutClinicInput.schema';
import { CasePricingPlanUncheckedCreateWithoutClinicInputObjectSchema as CasePricingPlanUncheckedCreateWithoutClinicInputObjectSchema } from './CasePricingPlanUncheckedCreateWithoutClinicInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CasePricingPlanUpdateWithoutClinicInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedUpdateWithoutClinicInputObjectSchema)]),
  create: z.union([z.lazy(() => CasePricingPlanCreateWithoutClinicInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedCreateWithoutClinicInputObjectSchema)])
}).strict();
export const CasePricingPlanUpsertWithWhereUniqueWithoutClinicInputObjectSchema: z.ZodType<Prisma.CasePricingPlanUpsertWithWhereUniqueWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanUpsertWithWhereUniqueWithoutClinicInput>;
export const CasePricingPlanUpsertWithWhereUniqueWithoutClinicInputObjectZodSchema = makeSchema();
