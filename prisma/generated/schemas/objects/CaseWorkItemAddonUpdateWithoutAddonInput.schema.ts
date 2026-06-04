import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CaseWorkItemUpdateOneRequiredWithoutAddonsNestedInputObjectSchema as CaseWorkItemUpdateOneRequiredWithoutAddonsNestedInputObjectSchema } from './CaseWorkItemUpdateOneRequiredWithoutAddonsNestedInput.schema';
import { LabUpdateOneRequiredWithoutCaseWorkItemAddonsNestedInputObjectSchema as LabUpdateOneRequiredWithoutCaseWorkItemAddonsNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutCaseWorkItemAddonsNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  priceSnapshot: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'priceSnapshot' must be a Decimal",
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  caseWorkItem: z.lazy(() => CaseWorkItemUpdateOneRequiredWithoutAddonsNestedInputObjectSchema).optional(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutCaseWorkItemAddonsNestedInputObjectSchema).optional()
}).strict();
export const CaseWorkItemAddonUpdateWithoutAddonInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonUpdateWithoutAddonInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonUpdateWithoutAddonInput>;
export const CaseWorkItemAddonUpdateWithoutAddonInputObjectZodSchema = makeSchema();
