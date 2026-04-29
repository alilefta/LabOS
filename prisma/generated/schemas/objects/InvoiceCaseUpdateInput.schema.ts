import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { InvoiceUpdateOneRequiredWithoutCasesNestedInputObjectSchema as InvoiceUpdateOneRequiredWithoutCasesNestedInputObjectSchema } from './InvoiceUpdateOneRequiredWithoutCasesNestedInput.schema';
import { CaseUpdateOneRequiredWithoutInvoiceCaseNestedInputObjectSchema as CaseUpdateOneRequiredWithoutInvoiceCaseNestedInputObjectSchema } from './CaseUpdateOneRequiredWithoutInvoiceCaseNestedInput.schema'

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
  invoice: z.lazy(() => InvoiceUpdateOneRequiredWithoutCasesNestedInputObjectSchema).optional(),
  case: z.lazy(() => CaseUpdateOneRequiredWithoutInvoiceCaseNestedInputObjectSchema).optional()
}).strict();
export const InvoiceCaseUpdateInputObjectSchema: z.ZodType<Prisma.InvoiceCaseUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseUpdateInput>;
export const InvoiceCaseUpdateInputObjectZodSchema = makeSchema();
