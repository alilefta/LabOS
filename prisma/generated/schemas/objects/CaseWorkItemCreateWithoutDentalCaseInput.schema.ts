import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { PricingStrategySchema } from '../enums/PricingStrategy.schema';
import { JawTypeSchema } from '../enums/JawType.schema';
import { ProductCreateNestedOneWithoutCaseWorkItemsInputObjectSchema as ProductCreateNestedOneWithoutCaseWorkItemsInputObjectSchema } from './ProductCreateNestedOneWithoutCaseWorkItemsInput.schema';
import { LabCreateNestedOneWithoutCaseWorkItemsInputObjectSchema as LabCreateNestedOneWithoutCaseWorkItemsInputObjectSchema } from './LabCreateNestedOneWithoutCaseWorkItemsInput.schema';
import { CasePricingPlanCreateNestedOneWithoutCaseWorkItemInputObjectSchema as CasePricingPlanCreateNestedOneWithoutCaseWorkItemInputObjectSchema } from './CasePricingPlanCreateNestedOneWithoutCaseWorkItemInput.schema';
import { SelectedToothCreateNestedManyWithoutCaseWorkItemInputObjectSchema as SelectedToothCreateNestedManyWithoutCaseWorkItemInputObjectSchema } from './SelectedToothCreateNestedManyWithoutCaseWorkItemInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
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
  product: z.lazy(() => ProductCreateNestedOneWithoutCaseWorkItemsInputObjectSchema).optional(),
  Lab: z.lazy(() => LabCreateNestedOneWithoutCaseWorkItemsInputObjectSchema),
  casePricingPlan: z.lazy(() => CasePricingPlanCreateNestedOneWithoutCaseWorkItemInputObjectSchema),
  selectedTeeth: z.lazy(() => SelectedToothCreateNestedManyWithoutCaseWorkItemInputObjectSchema).optional()
}).strict();
export const CaseWorkItemCreateWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseWorkItemCreateWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCreateWithoutDentalCaseInput>;
export const CaseWorkItemCreateWithoutDentalCaseInputObjectZodSchema = makeSchema();
