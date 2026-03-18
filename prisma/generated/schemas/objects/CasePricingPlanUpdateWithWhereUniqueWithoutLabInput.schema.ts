import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './CasePricingPlanWhereUniqueInput.schema';
import { CasePricingPlanUpdateWithoutLabInputObjectSchema as CasePricingPlanUpdateWithoutLabInputObjectSchema } from './CasePricingPlanUpdateWithoutLabInput.schema';
import { CasePricingPlanUncheckedUpdateWithoutLabInputObjectSchema as CasePricingPlanUncheckedUpdateWithoutLabInputObjectSchema } from './CasePricingPlanUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CasePricingPlanUpdateWithoutLabInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const CasePricingPlanUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.CasePricingPlanUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanUpdateWithWhereUniqueWithoutLabInput>;
export const CasePricingPlanUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
