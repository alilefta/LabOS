import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const invoicecasescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => InvoiceCaseScalarWhereInputObjectSchema), z.lazy(() => InvoiceCaseScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => InvoiceCaseScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => InvoiceCaseScalarWhereInputObjectSchema), z.lazy(() => InvoiceCaseScalarWhereInputObjectSchema).array()]).optional(),
  invoiceId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseTotal: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'caseTotal' must be a Decimal",
})]).optional()
}).strict();
export const InvoiceCaseScalarWhereInputObjectSchema: z.ZodType<Prisma.InvoiceCaseScalarWhereInput> = invoicecasescalarwhereinputSchema as unknown as z.ZodType<Prisma.InvoiceCaseScalarWhereInput>;
export const InvoiceCaseScalarWhereInputObjectZodSchema = invoicecasescalarwhereinputSchema;
