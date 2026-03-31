import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { PricingStrategySchema } from '../enums/PricingStrategy.schema';
import { LabCreateNestedOneWithoutCasePricingPlansInputObjectSchema as LabCreateNestedOneWithoutCasePricingPlansInputObjectSchema } from './LabCreateNestedOneWithoutCasePricingPlansInput.schema';
import { ClinicCreateNestedOneWithoutCasePricingPlansInputObjectSchema as ClinicCreateNestedOneWithoutCasePricingPlansInputObjectSchema } from './ClinicCreateNestedOneWithoutCasePricingPlansInput.schema';
import { CaseWorkItemCreateNestedManyWithoutCasePricingPlanInputObjectSchema as CaseWorkItemCreateNestedManyWithoutCasePricingPlanInputObjectSchema } from './CaseWorkItemCreateNestedManyWithoutCasePricingPlanInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  isDefault: z.boolean().optional(),
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
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutCasePricingPlansInputObjectSchema),
  clinic: z.lazy(() => ClinicCreateNestedOneWithoutCasePricingPlansInputObjectSchema).optional(),
  caseWorkItem: z.lazy(() => CaseWorkItemCreateNestedManyWithoutCasePricingPlanInputObjectSchema).optional()
}).strict();
export const CasePricingPlanCreateWithoutProductInputObjectSchema: z.ZodType<Prisma.CasePricingPlanCreateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanCreateWithoutProductInput>;
export const CasePricingPlanCreateWithoutProductInputObjectZodSchema = makeSchema();
