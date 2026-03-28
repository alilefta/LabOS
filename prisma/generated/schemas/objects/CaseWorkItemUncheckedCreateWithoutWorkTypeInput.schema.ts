import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { PricingStrategySchema } from '../enums/PricingStrategy.schema';
import { JawTypeSchema } from '../enums/JawType.schema';
import { SelectedToothUncheckedCreateNestedManyWithoutCaseWorkItemInputObjectSchema as SelectedToothUncheckedCreateNestedManyWithoutCaseWorkItemInputObjectSchema } from './SelectedToothUncheckedCreateNestedManyWithoutCaseWorkItemInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  productId: z.string().optional().nullable(),
  labId: z.string(),
  dentalCaseId: z.string(),
  casePricingPlanId: z.string(),
  totalPrice: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'totalPrice' must be a Decimal",
}),
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
  jawType: JawTypeSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  selectedTeeth: z.lazy(() => SelectedToothUncheckedCreateNestedManyWithoutCaseWorkItemInputObjectSchema).optional()
}).strict();
export const CaseWorkItemUncheckedCreateWithoutWorkTypeInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUncheckedCreateWithoutWorkTypeInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUncheckedCreateWithoutWorkTypeInput>;
export const CaseWorkItemUncheckedCreateWithoutWorkTypeInputObjectZodSchema = makeSchema();
