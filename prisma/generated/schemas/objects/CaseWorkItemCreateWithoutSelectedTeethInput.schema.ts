import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { PricingStrategySchema } from '../enums/PricingStrategy.schema';
import { JawTypeSchema } from '../enums/JawType.schema';
import { ProductCreateNestedOneWithoutCaseWorkItemsInputObjectSchema as ProductCreateNestedOneWithoutCaseWorkItemsInputObjectSchema } from './ProductCreateNestedOneWithoutCaseWorkItemsInput.schema';
import { LabCreateNestedOneWithoutCaseWorkItemsInputObjectSchema as LabCreateNestedOneWithoutCaseWorkItemsInputObjectSchema } from './LabCreateNestedOneWithoutCaseWorkItemsInput.schema';
import { CaseCreateNestedOneWithoutCaseItemsInputObjectSchema as CaseCreateNestedOneWithoutCaseItemsInputObjectSchema } from './CaseCreateNestedOneWithoutCaseItemsInput.schema';
import { CasePricingPlanCreateNestedOneWithoutCaseWorkItemInputObjectSchema as CasePricingPlanCreateNestedOneWithoutCaseWorkItemInputObjectSchema } from './CasePricingPlanCreateNestedOneWithoutCaseWorkItemInput.schema';
import { WorkTypeCreateNestedOneWithoutCaseWorkItemsInputObjectSchema as WorkTypeCreateNestedOneWithoutCaseWorkItemsInputObjectSchema } from './WorkTypeCreateNestedOneWithoutCaseWorkItemsInput.schema'

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
  notes: z.string().optional().nullable(),
  shadeSystem: z.string().optional().nullable(),
  baseShade: z.string().optional().nullable(),
  stumpShade: z.string().optional().nullable(),
  shadeNotes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutCaseWorkItemsInputObjectSchema).optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutCaseWorkItemsInputObjectSchema),
  dentalCase: z.lazy(() => CaseCreateNestedOneWithoutCaseItemsInputObjectSchema),
  casePricingPlan: z.lazy(() => CasePricingPlanCreateNestedOneWithoutCaseWorkItemInputObjectSchema),
  workType: z.lazy(() => WorkTypeCreateNestedOneWithoutCaseWorkItemsInputObjectSchema).optional()
}).strict();
export const CaseWorkItemCreateWithoutSelectedTeethInputObjectSchema: z.ZodType<Prisma.CaseWorkItemCreateWithoutSelectedTeethInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCreateWithoutSelectedTeethInput>;
export const CaseWorkItemCreateWithoutSelectedTeethInputObjectZodSchema = makeSchema();
