import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCreateNestedOneWithoutCasesInputObjectSchema as InvoiceCreateNestedOneWithoutCasesInputObjectSchema } from './InvoiceCreateNestedOneWithoutCasesInput.schema'

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
  invoice: z.lazy(() => InvoiceCreateNestedOneWithoutCasesInputObjectSchema)
}).strict();
export const InvoiceCaseCreateWithoutCaseInputObjectSchema: z.ZodType<Prisma.InvoiceCaseCreateWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseCreateWithoutCaseInput>;
export const InvoiceCaseCreateWithoutCaseInputObjectZodSchema = makeSchema();
