import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumPricingStrategyFilterObjectSchema as EnumPricingStrategyFilterObjectSchema } from './EnumPricingStrategyFilter.schema';
import { PricingStrategySchema } from '../enums/PricingStrategy.schema';
import { DecimalNullableFilterObjectSchema as DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { CaseWorkItemListRelationFilterObjectSchema as CaseWorkItemListRelationFilterObjectSchema } from './CaseWorkItemListRelationFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const casepricingplanwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CasePricingPlanWhereInputObjectSchema), z.lazy(() => CasePricingPlanWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CasePricingPlanWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CasePricingPlanWhereInputObjectSchema), z.lazy(() => CasePricingPlanWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  pricingStrategy: z.union([z.lazy(() => EnumPricingStrategyFilterObjectSchema), PricingStrategySchema]).optional(),
  firstToothPrice: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'firstToothPrice' must be a Decimal",
})]).optional().nullable(),
  bulkPrice: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'bulkPrice' must be a Decimal",
})]).optional().nullable(),
  additionalToothPrice: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'additionalToothPrice' must be a Decimal",
})]).optional().nullable(),
  bulkPriceThreshold: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'bulkPriceThreshold' must be a Decimal",
})]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  Lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional(),
  caseWorkItem: z.lazy(() => CaseWorkItemListRelationFilterObjectSchema).optional()
}).strict();
export const CasePricingPlanWhereInputObjectSchema: z.ZodType<Prisma.CasePricingPlanWhereInput> = casepricingplanwhereinputSchema as unknown as z.ZodType<Prisma.CasePricingPlanWhereInput>;
export const CasePricingPlanWhereInputObjectZodSchema = casepricingplanwhereinputSchema;
