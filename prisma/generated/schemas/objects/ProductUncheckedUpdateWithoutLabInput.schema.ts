import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CaseWorkItemUncheckedUpdateManyWithoutProductNestedInputObjectSchema as CaseWorkItemUncheckedUpdateManyWithoutProductNestedInputObjectSchema } from './CaseWorkItemUncheckedUpdateManyWithoutProductNestedInput.schema';
import { CasePricingPlanUncheckedUpdateManyWithoutProductNestedInputObjectSchema as CasePricingPlanUncheckedUpdateManyWithoutProductNestedInputObjectSchema } from './CasePricingPlanUncheckedUpdateManyWithoutProductNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  imageUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  workTypeId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemUncheckedUpdateManyWithoutProductNestedInputObjectSchema).optional(),
  casePricingPlans: z.lazy(() => CasePricingPlanUncheckedUpdateManyWithoutProductNestedInputObjectSchema).optional()
}).strict();
export const ProductUncheckedUpdateWithoutLabInputObjectSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUncheckedUpdateWithoutLabInput>;
export const ProductUncheckedUpdateWithoutLabInputObjectZodSchema = makeSchema();
