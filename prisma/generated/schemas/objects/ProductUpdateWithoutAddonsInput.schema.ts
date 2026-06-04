import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { CaseWorkItemUpdateManyWithoutProductNestedInputObjectSchema as CaseWorkItemUpdateManyWithoutProductNestedInputObjectSchema } from './CaseWorkItemUpdateManyWithoutProductNestedInput.schema';
import { LabUpdateOneRequiredWithoutProductsNestedInputObjectSchema as LabUpdateOneRequiredWithoutProductsNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutProductsNestedInput.schema';
import { WorkTypeUpdateOneRequiredWithoutProductsNestedInputObjectSchema as WorkTypeUpdateOneRequiredWithoutProductsNestedInputObjectSchema } from './WorkTypeUpdateOneRequiredWithoutProductsNestedInput.schema';
import { CasePricingPlanUpdateManyWithoutProductNestedInputObjectSchema as CasePricingPlanUpdateManyWithoutProductNestedInputObjectSchema } from './CasePricingPlanUpdateManyWithoutProductNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  imageUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  isArchived: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemUpdateManyWithoutProductNestedInputObjectSchema).optional(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutProductsNestedInputObjectSchema).optional(),
  workType: z.lazy(() => WorkTypeUpdateOneRequiredWithoutProductsNestedInputObjectSchema).optional(),
  casePricingPlans: z.lazy(() => CasePricingPlanUpdateManyWithoutProductNestedInputObjectSchema).optional()
}).strict();
export const ProductUpdateWithoutAddonsInputObjectSchema: z.ZodType<Prisma.ProductUpdateWithoutAddonsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateWithoutAddonsInput>;
export const ProductUpdateWithoutAddonsInputObjectZodSchema = makeSchema();
