import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './CasePricingPlanWhereUniqueInput.schema';
import { CasePricingPlanUpdateWithoutProductInputObjectSchema as CasePricingPlanUpdateWithoutProductInputObjectSchema } from './CasePricingPlanUpdateWithoutProductInput.schema';
import { CasePricingPlanUncheckedUpdateWithoutProductInputObjectSchema as CasePricingPlanUncheckedUpdateWithoutProductInputObjectSchema } from './CasePricingPlanUncheckedUpdateWithoutProductInput.schema';
import { CasePricingPlanCreateWithoutProductInputObjectSchema as CasePricingPlanCreateWithoutProductInputObjectSchema } from './CasePricingPlanCreateWithoutProductInput.schema';
import { CasePricingPlanUncheckedCreateWithoutProductInputObjectSchema as CasePricingPlanUncheckedCreateWithoutProductInputObjectSchema } from './CasePricingPlanUncheckedCreateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CasePricingPlanUpdateWithoutProductInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedUpdateWithoutProductInputObjectSchema)]),
  create: z.union([z.lazy(() => CasePricingPlanCreateWithoutProductInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedCreateWithoutProductInputObjectSchema)])
}).strict();
export const CasePricingPlanUpsertWithWhereUniqueWithoutProductInputObjectSchema: z.ZodType<Prisma.CasePricingPlanUpsertWithWhereUniqueWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanUpsertWithWhereUniqueWithoutProductInput>;
export const CasePricingPlanUpsertWithWhereUniqueWithoutProductInputObjectZodSchema = makeSchema();
