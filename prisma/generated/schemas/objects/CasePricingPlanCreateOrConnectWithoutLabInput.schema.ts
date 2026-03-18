import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './CasePricingPlanWhereUniqueInput.schema';
import { CasePricingPlanCreateWithoutLabInputObjectSchema as CasePricingPlanCreateWithoutLabInputObjectSchema } from './CasePricingPlanCreateWithoutLabInput.schema';
import { CasePricingPlanUncheckedCreateWithoutLabInputObjectSchema as CasePricingPlanUncheckedCreateWithoutLabInputObjectSchema } from './CasePricingPlanUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CasePricingPlanCreateWithoutLabInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const CasePricingPlanCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.CasePricingPlanCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanCreateOrConnectWithoutLabInput>;
export const CasePricingPlanCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
