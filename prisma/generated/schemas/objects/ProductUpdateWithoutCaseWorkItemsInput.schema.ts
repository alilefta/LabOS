import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LabUpdateOneRequiredWithoutProductsNestedInputObjectSchema as LabUpdateOneRequiredWithoutProductsNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutProductsNestedInput.schema';
import { WorkTypeUpdateOneRequiredWithoutProductNestedInputObjectSchema as WorkTypeUpdateOneRequiredWithoutProductNestedInputObjectSchema } from './WorkTypeUpdateOneRequiredWithoutProductNestedInput.schema';
import { CasePricingPlanUpdateManyWithoutProductNestedInputObjectSchema as CasePricingPlanUpdateManyWithoutProductNestedInputObjectSchema } from './CasePricingPlanUpdateManyWithoutProductNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  imageUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutProductsNestedInputObjectSchema).optional(),
  workType: z.lazy(() => WorkTypeUpdateOneRequiredWithoutProductNestedInputObjectSchema).optional(),
  casePricingPlans: z.lazy(() => CasePricingPlanUpdateManyWithoutProductNestedInputObjectSchema).optional()
}).strict();
export const ProductUpdateWithoutCaseWorkItemsInputObjectSchema: z.ZodType<Prisma.ProductUpdateWithoutCaseWorkItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateWithoutCaseWorkItemsInput>;
export const ProductUpdateWithoutCaseWorkItemsInputObjectZodSchema = makeSchema();
