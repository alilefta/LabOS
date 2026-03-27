import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { PricingStrategySchema } from '../enums/PricingStrategy.schema';
import { EnumPricingStrategyFieldUpdateOperationsInputObjectSchema as EnumPricingStrategyFieldUpdateOperationsInputObjectSchema } from './EnumPricingStrategyFieldUpdateOperationsInput.schema';
import { NullableDecimalFieldUpdateOperationsInputObjectSchema as NullableDecimalFieldUpdateOperationsInputObjectSchema } from './NullableDecimalFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LabUpdateOneRequiredWithoutCasePricingPlansNestedInputObjectSchema as LabUpdateOneRequiredWithoutCasePricingPlansNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutCasePricingPlansNestedInput.schema';
import { ProductUpdateOneWithoutCasePricingPlansNestedInputObjectSchema as ProductUpdateOneWithoutCasePricingPlansNestedInputObjectSchema } from './ProductUpdateOneWithoutCasePricingPlansNestedInput.schema';
import { CaseWorkItemUpdateManyWithoutCasePricingPlanNestedInputObjectSchema as CaseWorkItemUpdateManyWithoutCasePricingPlanNestedInputObjectSchema } from './CaseWorkItemUpdateManyWithoutCasePricingPlanNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  isDefault: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  pricingStrategy: z.union([PricingStrategySchema, z.lazy(() => EnumPricingStrategyFieldUpdateOperationsInputObjectSchema)]).optional(),
  firstToothPrice: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'firstToothPrice' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  bulkPrice: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'bulkPrice' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  additionalToothPrice: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'additionalToothPrice' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  bulkPriceThreshold: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'bulkPriceThreshold' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutCasePricingPlansNestedInputObjectSchema).optional(),
  product: z.lazy(() => ProductUpdateOneWithoutCasePricingPlansNestedInputObjectSchema).optional(),
  caseWorkItem: z.lazy(() => CaseWorkItemUpdateManyWithoutCasePricingPlanNestedInputObjectSchema).optional()
}).strict();
export const CasePricingPlanUpdateWithoutClinicInputObjectSchema: z.ZodType<Prisma.CasePricingPlanUpdateWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanUpdateWithoutClinicInput>;
export const CasePricingPlanUpdateWithoutClinicInputObjectZodSchema = makeSchema();
