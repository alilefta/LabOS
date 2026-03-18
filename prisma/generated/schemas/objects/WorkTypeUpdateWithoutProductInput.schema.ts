import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LabUpdateOneRequiredWithoutWorkTypesNestedInputObjectSchema as LabUpdateOneRequiredWithoutWorkTypesNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutWorkTypesNestedInput.schema';
import { CaseCategoryUpdateOneRequiredWithoutWorkTypesNestedInputObjectSchema as CaseCategoryUpdateOneRequiredWithoutWorkTypesNestedInputObjectSchema } from './CaseCategoryUpdateOneRequiredWithoutWorkTypesNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  imageUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  Lab: z.lazy(() => LabUpdateOneRequiredWithoutWorkTypesNestedInputObjectSchema).optional(),
  caseCategory: z.lazy(() => CaseCategoryUpdateOneRequiredWithoutWorkTypesNestedInputObjectSchema).optional()
}).strict();
export const WorkTypeUpdateWithoutProductInputObjectSchema: z.ZodType<Prisma.WorkTypeUpdateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUpdateWithoutProductInput>;
export const WorkTypeUpdateWithoutProductInputObjectZodSchema = makeSchema();
