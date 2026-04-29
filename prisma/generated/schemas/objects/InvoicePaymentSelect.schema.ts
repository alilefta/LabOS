import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceArgsObjectSchema as InvoiceArgsObjectSchema } from './InvoiceArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  invoiceId: z.boolean().optional(),
  invoice: z.union([z.boolean(), z.lazy(() => InvoiceArgsObjectSchema)]).optional(),
  labId: z.boolean().optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  amount: z.boolean().optional(),
  method: z.boolean().optional(),
  reference: z.boolean().optional(),
  notes: z.boolean().optional(),
  paidAt: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const InvoicePaymentSelectObjectSchema: z.ZodType<Prisma.InvoicePaymentSelect> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentSelect>;
export const InvoicePaymentSelectObjectZodSchema = makeSchema();
