import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ProductUpdateManyWithoutWorkTypeNestedInputObjectSchema as ProductUpdateManyWithoutWorkTypeNestedInputObjectSchema } from './ProductUpdateManyWithoutWorkTypeNestedInput.schema';
import { LabUpdateOneRequiredWithoutWorkTypesNestedInputObjectSchema as LabUpdateOneRequiredWithoutWorkTypesNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutWorkTypesNestedInput.schema';
import { CaseWorkItemUpdateManyWithoutWorkTypeNestedInputObjectSchema as CaseWorkItemUpdateManyWithoutWorkTypeNestedInputObjectSchema } from './CaseWorkItemUpdateManyWithoutWorkTypeNestedInput.schema';
import { CaseCategoryUpdateOneRequiredWithoutWorkTypesNestedInputObjectSchema as CaseCategoryUpdateOneRequiredWithoutWorkTypesNestedInputObjectSchema } from './CaseCategoryUpdateOneRequiredWithoutWorkTypesNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  imageUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  requireTeethSelection: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  product: z.lazy(() => ProductUpdateManyWithoutWorkTypeNestedInputObjectSchema).optional(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutWorkTypesNestedInputObjectSchema).optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemUpdateManyWithoutWorkTypeNestedInputObjectSchema).optional(),
  caseCategory: z.lazy(() => CaseCategoryUpdateOneRequiredWithoutWorkTypesNestedInputObjectSchema).optional()
}).strict();
export const WorkTypeUpdateInputObjectSchema: z.ZodType<Prisma.WorkTypeUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUpdateInput>;
export const WorkTypeUpdateInputObjectZodSchema = makeSchema();
