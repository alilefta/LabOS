import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  invoiceId: z.string(),
  caseId: z.string(),
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
export const InvoiceCaseUncheckedCreateInputObjectSchema: z.ZodType<Prisma.InvoiceCaseUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseUncheckedCreateInput>;
export const InvoiceCaseUncheckedCreateInputObjectZodSchema = makeSchema();
