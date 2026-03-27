import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './CasePricingPlanWhereUniqueInput.schema';
import { CasePricingPlanCreateWithoutClinicInputObjectSchema as CasePricingPlanCreateWithoutClinicInputObjectSchema } from './CasePricingPlanCreateWithoutClinicInput.schema';
import { CasePricingPlanUncheckedCreateWithoutClinicInputObjectSchema as CasePricingPlanUncheckedCreateWithoutClinicInputObjectSchema } from './CasePricingPlanUncheckedCreateWithoutClinicInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CasePricingPlanCreateWithoutClinicInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedCreateWithoutClinicInputObjectSchema)])
}).strict();
export const CasePricingPlanCreateOrConnectWithoutClinicInputObjectSchema: z.ZodType<Prisma.CasePricingPlanCreateOrConnectWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanCreateOrConnectWithoutClinicInput>;
export const CasePricingPlanCreateOrConnectWithoutClinicInputObjectZodSchema = makeSchema();
