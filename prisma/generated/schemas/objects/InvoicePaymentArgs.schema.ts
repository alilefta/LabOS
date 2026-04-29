import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoicePaymentSelectObjectSchema as InvoicePaymentSelectObjectSchema } from './InvoicePaymentSelect.schema';
import { InvoicePaymentIncludeObjectSchema as InvoicePaymentIncludeObjectSchema } from './InvoicePaymentInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => InvoicePaymentSelectObjectSchema).optional(),
  include: z.lazy(() => InvoicePaymentIncludeObjectSchema).optional()
}).strict();
export const InvoicePaymentArgsObjectSchema = makeSchema();
export const InvoicePaymentArgsObjectZodSchema = makeSchema();
