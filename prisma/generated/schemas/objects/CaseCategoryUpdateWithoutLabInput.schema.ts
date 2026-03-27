import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { WorkTypeUpdateManyWithoutCaseCategoryNestedInputObjectSchema as WorkTypeUpdateManyWithoutCaseCategoryNestedInputObjectSchema } from './WorkTypeUpdateManyWithoutCaseCategoryNestedInput.schema';
import { CaseUpdateManyWithoutCaseCategoryNestedInputObjectSchema as CaseUpdateManyWithoutCaseCategoryNestedInputObjectSchema } from './CaseUpdateManyWithoutCaseCategoryNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  imageUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  workTypes: z.lazy(() => WorkTypeUpdateManyWithoutCaseCategoryNestedInputObjectSchema).optional(),
  cases: z.lazy(() => CaseUpdateManyWithoutCaseCategoryNestedInputObjectSchema).optional()
}).strict();
export const CaseCategoryUpdateWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseCategoryUpdateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryUpdateWithoutLabInput>;
export const CaseCategoryUpdateWithoutLabInputObjectZodSchema = makeSchema();
