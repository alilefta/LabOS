import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LabUpdateOneRequiredWithoutProductsNestedInputObjectSchema as LabUpdateOneRequiredWithoutProductsNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutProductsNestedInput.schema';
import { WorkTypeUpdateOneRequiredWithoutProductNestedInputObjectSchema as WorkTypeUpdateOneRequiredWithoutProductNestedInputObjectSchema } from './WorkTypeUpdateOneRequiredWithoutProductNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  imageUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutProductsNestedInputObjectSchema).optional(),
  workType: z.lazy(() => WorkTypeUpdateOneRequiredWithoutProductNestedInputObjectSchema).optional()
}).strict();
export const ProductUpdateWithoutCaseWorkItemsInputObjectSchema: z.ZodType<Prisma.ProductUpdateWithoutCaseWorkItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateWithoutCaseWorkItemsInput>;
export const ProductUpdateWithoutCaseWorkItemsInputObjectZodSchema = makeSchema();
