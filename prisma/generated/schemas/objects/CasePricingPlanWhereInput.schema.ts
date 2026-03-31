import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { EnumPricingStrategyFilterObjectSchema as EnumPricingStrategyFilterObjectSchema } from './EnumPricingStrategyFilter.schema';
import { PricingStrategySchema } from '../enums/PricingStrategy.schema';
import { DecimalNullableFilterObjectSchema as DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { ProductNullableScalarRelationFilterObjectSchema as ProductNullableScalarRelationFilterObjectSchema } from './ProductNullableScalarRelationFilter.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema';
import { ClinicNullableScalarRelationFilterObjectSchema as ClinicNullableScalarRelationFilterObjectSchema } from './ClinicNullableScalarRelationFilter.schema';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './ClinicWhereInput.schema';
import { CaseWorkItemListRelationFilterObjectSchema as CaseWorkItemListRelationFilterObjectSchema } from './CaseWorkItemListRelationFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const casepricingplanwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CasePricingPlanWhereInputObjectSchema), z.lazy(() => CasePricingPlanWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CasePricingPlanWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CasePricingPlanWhereInputObjectSchema), z.lazy(() => CasePricingPlanWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  isDefault: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  pricingStrategy: z.union([z.lazy(() => EnumPricingStrategyFilterObjectSchema), PricingStrategySchema]).optional(),
  firstToothPrice: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'firstToothPrice' must be a Decimal",
})]).optional().nullable(),
  additionalToothPrice: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'additionalToothPrice' must be a Decimal",
})]).optional().nullable(),
  teethCountToApplyBulkPrice: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'teethCountToApplyBulkPrice' must be a Decimal",
})]).optional().nullable(),
  bulkPrice: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'bulkPrice' must be a Decimal",
})]).optional().nullable(),
  toothPrice: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'toothPrice' must be a Decimal",
})]).optional().nullable(),
  productId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  clinicId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional(),
  product: z.union([z.lazy(() => ProductNullableScalarRelationFilterObjectSchema), z.lazy(() => ProductWhereInputObjectSchema)]).optional(),
  clinic: z.union([z.lazy(() => ClinicNullableScalarRelationFilterObjectSchema), z.lazy(() => ClinicWhereInputObjectSchema)]).optional(),
  caseWorkItem: z.lazy(() => CaseWorkItemListRelationFilterObjectSchema).optional()
}).strict();
export const CasePricingPlanWhereInputObjectSchema: z.ZodType<Prisma.CasePricingPlanWhereInput> = casepricingplanwhereinputSchema as unknown as z.ZodType<Prisma.CasePricingPlanWhereInput>;
export const CasePricingPlanWhereInputObjectZodSchema = casepricingplanwhereinputSchema;
