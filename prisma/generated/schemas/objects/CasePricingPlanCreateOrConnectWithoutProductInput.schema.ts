import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './CasePricingPlanWhereUniqueInput.schema';
import { CasePricingPlanCreateWithoutProductInputObjectSchema as CasePricingPlanCreateWithoutProductInputObjectSchema } from './CasePricingPlanCreateWithoutProductInput.schema';
import { CasePricingPlanUncheckedCreateWithoutProductInputObjectSchema as CasePricingPlanUncheckedCreateWithoutProductInputObjectSchema } from './CasePricingPlanUncheckedCreateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CasePricingPlanCreateWithoutProductInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedCreateWithoutProductInputObjectSchema)])
}).strict();
export const CasePricingPlanCreateOrConnectWithoutProductInputObjectSchema: z.ZodType<Prisma.CasePricingPlanCreateOrConnectWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanCreateOrConnectWithoutProductInput>;
export const CasePricingPlanCreateOrConnectWithoutProductInputObjectZodSchema = makeSchema();
