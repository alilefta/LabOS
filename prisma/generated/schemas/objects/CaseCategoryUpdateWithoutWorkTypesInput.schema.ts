import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CaseUpdateManyWithoutCaseCategoryNestedInputObjectSchema as CaseUpdateManyWithoutCaseCategoryNestedInputObjectSchema } from './CaseUpdateManyWithoutCaseCategoryNestedInput.schema';
import { LabUpdateOneRequiredWithoutCaseCategoriesNestedInputObjectSchema as LabUpdateOneRequiredWithoutCaseCategoriesNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutCaseCategoriesNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  imageUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  cases: z.lazy(() => CaseUpdateManyWithoutCaseCategoryNestedInputObjectSchema).optional(),
  Lab: z.lazy(() => LabUpdateOneRequiredWithoutCaseCategoriesNestedInputObjectSchema).optional()
}).strict();
export const CaseCategoryUpdateWithoutWorkTypesInputObjectSchema: z.ZodType<Prisma.CaseCategoryUpdateWithoutWorkTypesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryUpdateWithoutWorkTypesInput>;
export const CaseCategoryUpdateWithoutWorkTypesInputObjectZodSchema = makeSchema();
