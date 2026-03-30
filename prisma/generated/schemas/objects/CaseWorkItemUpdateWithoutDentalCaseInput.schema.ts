import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { PricingStrategySchema } from '../enums/PricingStrategy.schema';
import { EnumPricingStrategyFieldUpdateOperationsInputObjectSchema as EnumPricingStrategyFieldUpdateOperationsInputObjectSchema } from './EnumPricingStrategyFieldUpdateOperationsInput.schema';
import { NullableDecimalFieldUpdateOperationsInputObjectSchema as NullableDecimalFieldUpdateOperationsInputObjectSchema } from './NullableDecimalFieldUpdateOperationsInput.schema';
import { JawTypeSchema } from '../enums/JawType.schema';
import { EnumJawTypeFieldUpdateOperationsInputObjectSchema as EnumJawTypeFieldUpdateOperationsInputObjectSchema } from './EnumJawTypeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ProductUpdateOneWithoutCaseWorkItemsNestedInputObjectSchema as ProductUpdateOneWithoutCaseWorkItemsNestedInputObjectSchema } from './ProductUpdateOneWithoutCaseWorkItemsNestedInput.schema';
import { LabUpdateOneRequiredWithoutCaseWorkItemsNestedInputObjectSchema as LabUpdateOneRequiredWithoutCaseWorkItemsNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutCaseWorkItemsNestedInput.schema';
import { CasePricingPlanUpdateOneRequiredWithoutCaseWorkItemNestedInputObjectSchema as CasePricingPlanUpdateOneRequiredWithoutCaseWorkItemNestedInputObjectSchema } from './CasePricingPlanUpdateOneRequiredWithoutCaseWorkItemNestedInput.schema';
import { WorkTypeUpdateOneWithoutCaseWorkItemsNestedInputObjectSchema as WorkTypeUpdateOneWithoutCaseWorkItemsNestedInputObjectSchema } from './WorkTypeUpdateOneWithoutCaseWorkItemsNestedInput.schema';
import { SelectedToothUpdateManyWithoutCaseWorkItemNestedInputObjectSchema as SelectedToothUpdateManyWithoutCaseWorkItemNestedInputObjectSchema } from './SelectedToothUpdateManyWithoutCaseWorkItemNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  totalPrice: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'totalPrice' must be a Decimal",
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  pricingStrategy: z.union([PricingStrategySchema, z.lazy(() => EnumPricingStrategyFieldUpdateOperationsInputObjectSchema)]).optional(),
  firstToothPrice: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'firstToothPrice' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  additionalToothPrice: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'additionalToothPrice' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  teethCountToApplyBulkPrice: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'teethCountToApplyBulkPrice' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  bulkPrice: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'bulkPrice' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  toothPrice: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'toothPrice' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  jawType: z.union([JawTypeSchema, z.lazy(() => EnumJawTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  product: z.lazy(() => ProductUpdateOneWithoutCaseWorkItemsNestedInputObjectSchema).optional(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutCaseWorkItemsNestedInputObjectSchema).optional(),
  casePricingPlan: z.lazy(() => CasePricingPlanUpdateOneRequiredWithoutCaseWorkItemNestedInputObjectSchema).optional(),
  workType: z.lazy(() => WorkTypeUpdateOneWithoutCaseWorkItemsNestedInputObjectSchema).optional(),
  selectedTeeth: z.lazy(() => SelectedToothUpdateManyWithoutCaseWorkItemNestedInputObjectSchema).optional()
}).strict();
export const CaseWorkItemUpdateWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpdateWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpdateWithoutDentalCaseInput>;
export const CaseWorkItemUpdateWithoutDentalCaseInputObjectZodSchema = makeSchema();
