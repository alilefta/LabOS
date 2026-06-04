import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LabUpdateOneRequiredWithoutProductAddonsNestedInputObjectSchema as LabUpdateOneRequiredWithoutProductAddonsNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutProductAddonsNestedInput.schema';
import { CaseWorkItemAddonUpdateManyWithoutAddonNestedInputObjectSchema as CaseWorkItemAddonUpdateManyWithoutAddonNestedInputObjectSchema } from './CaseWorkItemAddonUpdateManyWithoutAddonNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  price: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'price' must be a Decimal",
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  isArchived: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutProductAddonsNestedInputObjectSchema).optional(),
  caseWorkItemAddons: z.lazy(() => CaseWorkItemAddonUpdateManyWithoutAddonNestedInputObjectSchema).optional()
}).strict();
export const ProductAddonUpdateWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductAddonUpdateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonUpdateWithoutProductInput>;
export const ProductAddonUpdateWithoutProductInputObjectZodSchema = makeSchema();
