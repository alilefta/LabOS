import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { InvoiceScalarRelationFilterObjectSchema as InvoiceScalarRelationFilterObjectSchema } from './InvoiceScalarRelationFilter.schema';
import { InvoiceWhereInputObjectSchema as InvoiceWhereInputObjectSchema } from './InvoiceWhereInput.schema';
import { CaseScalarRelationFilterObjectSchema as CaseScalarRelationFilterObjectSchema } from './CaseScalarRelationFilter.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const invoicecasewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => InvoiceCaseWhereInputObjectSchema), z.lazy(() => InvoiceCaseWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => InvoiceCaseWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => InvoiceCaseWhereInputObjectSchema), z.lazy(() => InvoiceCaseWhereInputObjectSchema).array()]).optional(),
  invoiceId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseTotal: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'caseTotal' must be a Decimal",
})]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  invoice: z.union([z.lazy(() => InvoiceScalarRelationFilterObjectSchema), z.lazy(() => InvoiceWhereInputObjectSchema)]).optional(),
  case: z.union([z.lazy(() => CaseScalarRelationFilterObjectSchema), z.lazy(() => CaseWhereInputObjectSchema)]).optional(),
  lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional()
}).strict();
export const InvoiceCaseWhereInputObjectSchema: z.ZodType<Prisma.InvoiceCaseWhereInput> = invoicecasewhereinputSchema as unknown as z.ZodType<Prisma.InvoiceCaseWhereInput>;
export const InvoiceCaseWhereInputObjectZodSchema = invoicecasewhereinputSchema;
