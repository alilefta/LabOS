import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { PricingStrategySchema } from '../enums/PricingStrategy.schema';
import { CaseWorkItemUncheckedCreateNestedManyWithoutCasePricingPlanInputObjectSchema as CaseWorkItemUncheckedCreateNestedManyWithoutCasePricingPlanInputObjectSchema } from './CaseWorkItemUncheckedCreateNestedManyWithoutCasePricingPlanInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  labId: z.string(),
  pricingStrategy: PricingStrategySchema.optional(),
  firstToothPrice: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'firstToothPrice' must be a Decimal",
}).optional().nullable(),
  bulkPrice: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'bulkPrice' must be a Decimal",
}).optional().nullable(),
  additionalToothPrice: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'additionalToothPrice' must be a Decimal",
}).optional().nullable(),
  bulkPriceThreshold: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'bulkPriceThreshold' must be a Decimal",
}).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  caseWorkItem: z.lazy(() => CaseWorkItemUncheckedCreateNestedManyWithoutCasePricingPlanInputObjectSchema).optional()
}).strict();
export const CasePricingPlanUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CasePricingPlanUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanUncheckedCreateInput>;
export const CasePricingPlanUncheckedCreateInputObjectZodSchema = makeSchema();
