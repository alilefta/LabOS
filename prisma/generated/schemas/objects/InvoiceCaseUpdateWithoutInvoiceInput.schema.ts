import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { CaseUpdateOneRequiredWithoutInvoiceCaseNestedInputObjectSchema as CaseUpdateOneRequiredWithoutInvoiceCaseNestedInputObjectSchema } from './CaseUpdateOneRequiredWithoutInvoiceCaseNestedInput.schema';
import { LabUpdateOneRequiredWithoutInvoiceCaseNestedInputObjectSchema as LabUpdateOneRequiredWithoutInvoiceCaseNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutInvoiceCaseNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  caseTotal: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'caseTotal' must be a Decimal",
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  case: z.lazy(() => CaseUpdateOneRequiredWithoutInvoiceCaseNestedInputObjectSchema).optional(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutInvoiceCaseNestedInputObjectSchema).optional()
}).strict();
export const InvoiceCaseUpdateWithoutInvoiceInputObjectSchema: z.ZodType<Prisma.InvoiceCaseUpdateWithoutInvoiceInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseUpdateWithoutInvoiceInput>;
export const InvoiceCaseUpdateWithoutInvoiceInputObjectZodSchema = makeSchema();
