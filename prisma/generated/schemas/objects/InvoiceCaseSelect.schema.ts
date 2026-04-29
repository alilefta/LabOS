import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceArgsObjectSchema as InvoiceArgsObjectSchema } from './InvoiceArgs.schema';
import { CaseArgsObjectSchema as CaseArgsObjectSchema } from './CaseArgs.schema'

const makeSchema = () => z.object({
  invoiceId: z.boolean().optional(),
  invoice: z.union([z.boolean(), z.lazy(() => InvoiceArgsObjectSchema)]).optional(),
  caseId: z.boolean().optional(),
  case: z.union([z.boolean(), z.lazy(() => CaseArgsObjectSchema)]).optional(),
  caseTotal: z.boolean().optional()
}).strict();
export const InvoiceCaseSelectObjectSchema: z.ZodType<Prisma.InvoiceCaseSelect> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseSelect>;
export const InvoiceCaseSelectObjectZodSchema = makeSchema();
