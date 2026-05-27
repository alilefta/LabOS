import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { InvoiceOrderByWithRelationInputObjectSchema as InvoiceOrderByWithRelationInputObjectSchema } from './InvoiceOrderByWithRelationInput.schema';
import { CaseOrderByWithRelationInputObjectSchema as CaseOrderByWithRelationInputObjectSchema } from './CaseOrderByWithRelationInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  invoiceId: SortOrderSchema.optional(),
  caseId: SortOrderSchema.optional(),
  caseTotal: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  invoice: z.lazy(() => InvoiceOrderByWithRelationInputObjectSchema).optional(),
  case: z.lazy(() => CaseOrderByWithRelationInputObjectSchema).optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const InvoiceCaseOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.InvoiceCaseOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseOrderByWithRelationInput>;
export const InvoiceCaseOrderByWithRelationInputObjectZodSchema = makeSchema();
