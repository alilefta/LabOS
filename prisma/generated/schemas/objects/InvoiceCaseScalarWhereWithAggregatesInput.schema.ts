import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema as DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const invoicecasescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => InvoiceCaseScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => InvoiceCaseScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => InvoiceCaseScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => InvoiceCaseScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => InvoiceCaseScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  invoiceId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  caseTotal: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'caseTotal' must be a Decimal",
})]).optional(),
  labId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional()
}).strict();
export const InvoiceCaseScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.InvoiceCaseScalarWhereWithAggregatesInput> = invoicecasescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.InvoiceCaseScalarWhereWithAggregatesInput>;
export const InvoiceCaseScalarWhereWithAggregatesInputObjectZodSchema = invoicecasescalarwherewithaggregatesinputSchema;
