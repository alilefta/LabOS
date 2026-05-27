import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCreateNestedOneWithoutCasesInputObjectSchema as InvoiceCreateNestedOneWithoutCasesInputObjectSchema } from './InvoiceCreateNestedOneWithoutCasesInput.schema';
import { CaseCreateNestedOneWithoutInvoiceCaseInputObjectSchema as CaseCreateNestedOneWithoutInvoiceCaseInputObjectSchema } from './CaseCreateNestedOneWithoutInvoiceCaseInput.schema';
import { LabCreateNestedOneWithoutInvoiceCaseInputObjectSchema as LabCreateNestedOneWithoutInvoiceCaseInputObjectSchema } from './LabCreateNestedOneWithoutInvoiceCaseInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  caseTotal: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'caseTotal' must be a Decimal",
}),
  invoice: z.lazy(() => InvoiceCreateNestedOneWithoutCasesInputObjectSchema),
  case: z.lazy(() => CaseCreateNestedOneWithoutInvoiceCaseInputObjectSchema),
  lab: z.lazy(() => LabCreateNestedOneWithoutInvoiceCaseInputObjectSchema)
}).strict();
export const InvoiceCaseCreateInputObjectSchema: z.ZodType<Prisma.InvoiceCaseCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseCreateInput>;
export const InvoiceCaseCreateInputObjectZodSchema = makeSchema();
