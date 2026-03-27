import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './CasePricingPlanWhereUniqueInput.schema';
import { CasePricingPlanUpdateWithoutProductInputObjectSchema as CasePricingPlanUpdateWithoutProductInputObjectSchema } from './CasePricingPlanUpdateWithoutProductInput.schema';
import { CasePricingPlanUncheckedUpdateWithoutProductInputObjectSchema as CasePricingPlanUncheckedUpdateWithoutProductInputObjectSchema } from './CasePricingPlanUncheckedUpdateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CasePricingPlanUpdateWithoutProductInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedUpdateWithoutProductInputObjectSchema)])
}).strict();
export const CasePricingPlanUpdateWithWhereUniqueWithoutProductInputObjectSchema: z.ZodType<Prisma.CasePricingPlanUpdateWithWhereUniqueWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanUpdateWithWhereUniqueWithoutProductInput>;
export const CasePricingPlanUpdateWithWhereUniqueWithoutProductInputObjectZodSchema = makeSchema();
