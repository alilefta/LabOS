import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CaseWorkItemUpdateManyWithoutProductNestedInputObjectSchema as CaseWorkItemUpdateManyWithoutProductNestedInputObjectSchema } from './CaseWorkItemUpdateManyWithoutProductNestedInput.schema';
import { LabUpdateOneRequiredWithoutProductsNestedInputObjectSchema as LabUpdateOneRequiredWithoutProductsNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutProductsNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  imageUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemUpdateManyWithoutProductNestedInputObjectSchema).optional(),
  Lab: z.lazy(() => LabUpdateOneRequiredWithoutProductsNestedInputObjectSchema).optional()
}).strict();
export const ProductUpdateWithoutWorkTypeInputObjectSchema: z.ZodType<Prisma.ProductUpdateWithoutWorkTypeInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateWithoutWorkTypeInput>;
export const ProductUpdateWithoutWorkTypeInputObjectZodSchema = makeSchema();
