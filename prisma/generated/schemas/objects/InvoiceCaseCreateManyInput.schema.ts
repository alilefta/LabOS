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
})
}).strict();
export const InvoiceCaseCreateManyInputObjectSchema: z.ZodType<Prisma.InvoiceCaseCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseCreateManyInput>;
export const InvoiceCaseCreateManyInputObjectZodSchema = makeSchema();
