import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema as DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { EnumPricingStrategyWithAggregatesFilterObjectSchema as EnumPricingStrategyWithAggregatesFilterObjectSchema } from './EnumPricingStrategyWithAggregatesFilter.schema';
import { PricingStrategySchema } from '../enums/PricingStrategy.schema';
import { DecimalNullableWithAggregatesFilterObjectSchema as DecimalNullableWithAggregatesFilterObjectSchema } from './DecimalNullableWithAggregatesFilter.schema';
import { EnumJawTypeWithAggregatesFilterObjectSchema as EnumJawTypeWithAggregatesFilterObjectSchema } from './EnumJawTypeWithAggregatesFilter.schema';
import { JawTypeSchema } from '../enums/JawType.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const caseworkitemscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseWorkItemScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CaseWorkItemScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseWorkItemScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseWorkItemScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CaseWorkItemScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  productId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  labId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  dentalCaseId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  casePricingPlanId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  totalPrice: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'totalPrice' must be a Decimal",
})]).optional(),
  pricingStrategy: z.union([z.lazy(() => EnumPricingStrategyWithAggregatesFilterObjectSchema), PricingStrategySchema]).optional(),
  firstToothPrice: z.union([z.lazy(() => DecimalNullableWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'firstToothPrice' must be a Decimal",
})]).optional().nullable(),
  bulkPrice: z.union([z.lazy(() => DecimalNullableWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'bulkPrice' must be a Decimal",
})]).optional().nullable(),
  additionalToothPrice: z.union([z.lazy(() => DecimalNullableWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'additionalToothPrice' must be a Decimal",
})]).optional().nullable(),
  bulkPriceThreshold: z.union([z.lazy(() => DecimalNullableWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'bulkPriceThreshold' must be a Decimal",
})]).optional().nullable(),
  jawType: z.union([z.lazy(() => EnumJawTypeWithAggregatesFilterObjectSchema), JawTypeSchema]).optional(),
  workTypeId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CaseWorkItemScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CaseWorkItemScalarWhereWithAggregatesInput> = caseworkitemscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.CaseWorkItemScalarWhereWithAggregatesInput>;
export const CaseWorkItemScalarWhereWithAggregatesInputObjectZodSchema = caseworkitemscalarwherewithaggregatesinputSchema;
