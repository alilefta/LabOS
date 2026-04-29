import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { ClinicArgsObjectSchema as ClinicArgsObjectSchema } from './ClinicArgs.schema';
import { InvoiceCaseFindManySchema as InvoiceCaseFindManySchema } from '../findManyInvoiceCase.schema';
import { InvoicePaymentFindManySchema as InvoicePaymentFindManySchema } from '../findManyInvoicePayment.schema';
import { InvoiceCountOutputTypeArgsObjectSchema as InvoiceCountOutputTypeArgsObjectSchema } from './InvoiceCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  labId: z.boolean().optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  clinicId: z.boolean().optional(),
  clinic: z.union([z.boolean(), z.lazy(() => ClinicArgsObjectSchema)]).optional(),
  invoiceNumber: z.boolean().optional(),
  status: z.boolean().optional(),
  notes: z.boolean().optional(),
  subtotal: z.boolean().optional(),
  discountAmount: z.boolean().optional(),
  total: z.boolean().optional(),
  amountPaid: z.boolean().optional(),
  amountDue: z.boolean().optional(),
  issuedAt: z.boolean().optional(),
  dueDate: z.boolean().optional(),
  publicToken: z.boolean().optional(),
  publicLinkExpiresAt: z.boolean().optional(),
  cases: z.union([z.boolean(), z.lazy(() => InvoiceCaseFindManySchema)]).optional(),
  payments: z.union([z.boolean(), z.lazy(() => InvoicePaymentFindManySchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => InvoiceCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const InvoiceSelectObjectSchema: z.ZodType<Prisma.InvoiceSelect> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceSelect>;
export const InvoiceSelectObjectZodSchema = makeSchema();
