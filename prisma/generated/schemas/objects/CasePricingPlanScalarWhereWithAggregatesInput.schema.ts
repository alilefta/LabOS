import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumPricingStrategyWithAggregatesFilterObjectSchema as EnumPricingStrategyWithAggregatesFilterObjectSchema } from './EnumPricingStrategyWithAggregatesFilter.schema';
import { PricingStrategySchema } from '../enums/PricingStrategy.schema';
import { DecimalNullableWithAggregatesFilterObjectSchema as DecimalNullableWithAggregatesFilterObjectSchema } from './DecimalNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const casepricingplanscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => CasePricingPlanScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CasePricingPlanScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CasePricingPlanScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CasePricingPlanScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CasePricingPlanScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
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
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CasePricingPlanScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CasePricingPlanScalarWhereWithAggregatesInput> = casepricingplanscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.CasePricingPlanScalarWhereWithAggregatesInput>;
export const CasePricingPlanScalarWhereWithAggregatesInputObjectZodSchema = casepricingplanscalarwherewithaggregatesinputSchema;
