import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ProductUncheckedUpdateManyWithoutWorkTypeNestedInputObjectSchema as ProductUncheckedUpdateManyWithoutWorkTypeNestedInputObjectSchema } from './ProductUncheckedUpdateManyWithoutWorkTypeNestedInput.schema';
import { CaseWorkItemUncheckedUpdateManyWithoutWorkTypeNestedInputObjectSchema as CaseWorkItemUncheckedUpdateManyWithoutWorkTypeNestedInputObjectSchema } from './CaseWorkItemUncheckedUpdateManyWithoutWorkTypeNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  imageUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  requireTeethSelection: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  caseCategoryId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutWorkTypeNestedInputObjectSchema).optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemUncheckedUpdateManyWithoutWorkTypeNestedInputObjectSchema).optional()
}).strict();
export const WorkTypeUncheckedUpdateWithoutLabInputObjectSchema: z.ZodType<Prisma.WorkTypeUncheckedUpdateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUncheckedUpdateWithoutLabInput>;
export const WorkTypeUncheckedUpdateWithoutLabInputObjectZodSchema = makeSchema();
