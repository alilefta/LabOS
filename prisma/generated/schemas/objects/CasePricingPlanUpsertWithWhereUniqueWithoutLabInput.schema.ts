import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './CasePricingPlanWhereUniqueInput.schema';
import { CasePricingPlanUpdateWithoutLabInputObjectSchema as CasePricingPlanUpdateWithoutLabInputObjectSchema } from './CasePricingPlanUpdateWithoutLabInput.schema';
import { CasePricingPlanUncheckedUpdateWithoutLabInputObjectSchema as CasePricingPlanUncheckedUpdateWithoutLabInputObjectSchema } from './CasePricingPlanUncheckedUpdateWithoutLabInput.schema';
import { CasePricingPlanCreateWithoutLabInputObjectSchema as CasePricingPlanCreateWithoutLabInputObjectSchema } from './CasePricingPlanCreateWithoutLabInput.schema';
import { CasePricingPlanUncheckedCreateWithoutLabInputObjectSchema as CasePricingPlanUncheckedCreateWithoutLabInputObjectSchema } from './CasePricingPlanUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CasePricingPlanUpdateWithoutLabInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => CasePricingPlanCreateWithoutLabInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const CasePricingPlanUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.CasePricingPlanUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanUpsertWithWhereUniqueWithoutLabInput>;
export const CasePricingPlanUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
