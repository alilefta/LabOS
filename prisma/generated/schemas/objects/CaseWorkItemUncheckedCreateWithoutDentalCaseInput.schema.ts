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
  additionalToothPrice: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'additionalToothPrice' must be a Decimal",
}).optional().nullable(),
  teethCountToApplyBulkPrice: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'teethCountToApplyBulkPrice' must be a Decimal",
}).optional().nullable(),
  bulkPrice: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'bulkPrice' must be a Decimal",
}).optional().nullable(),
  toothPrice: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'toothPrice' must be a Decimal",
}).optional().nullable(),
  jawType: JawTypeSchema.optional(),
  workTypeId: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  shadeSystem: z.string().optional().nullable(),
  baseShade: z.string().optional().nullable(),
  stumpShade: z.string().optional().nullable(),
  shadeNotes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  selectedTeeth: z.lazy(() => SelectedToothUncheckedCreateNestedManyWithoutCaseWorkItemInputObjectSchema).optional()
}).strict();
export const CaseWorkItemUncheckedCreateWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUncheckedCreateWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUncheckedCreateWithoutDentalCaseInput>;
export const CaseWorkItemUncheckedCreateWithoutDentalCaseInputObjectZodSchema = makeSchema();
