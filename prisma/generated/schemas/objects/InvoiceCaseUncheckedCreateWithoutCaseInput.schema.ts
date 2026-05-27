import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  invoiceId: z.string(),
  caseTotal: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'caseTotal' must be a Decimal",
}),
  labId: z.string()
}).strict();
export const InvoiceCaseUncheckedCreateWithoutCaseInputObjectSchema: z.ZodType<Prisma.InvoiceCaseUncheckedCreateWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseUncheckedCreateWithoutCaseInput>;
export const InvoiceCaseUncheckedCreateWithoutCaseInputObjectZodSchema = makeSchema();
