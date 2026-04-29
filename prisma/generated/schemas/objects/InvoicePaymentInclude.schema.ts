import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceArgsObjectSchema as InvoiceArgsObjectSchema } from './InvoiceArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema'

const makeSchema = () => z.object({
  invoice: z.union([z.boolean(), z.lazy(() => InvoiceArgsObjectSchema)]).optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional()
}).strict();
export const InvoicePaymentIncludeObjectSchema: z.ZodType<Prisma.InvoicePaymentInclude> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentInclude>;
export const InvoicePaymentIncludeObjectZodSchema = makeSchema();
