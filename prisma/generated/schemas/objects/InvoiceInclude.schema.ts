import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { ClinicArgsObjectSchema as ClinicArgsObjectSchema } from './ClinicArgs.schema';
import { InvoiceCaseFindManySchema as InvoiceCaseFindManySchema } from '../findManyInvoiceCase.schema';
import { InvoicePaymentFindManySchema as InvoicePaymentFindManySchema } from '../findManyInvoicePayment.schema';
import { InvoiceCountOutputTypeArgsObjectSchema as InvoiceCountOutputTypeArgsObjectSchema } from './InvoiceCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  clinic: z.union([z.boolean(), z.lazy(() => ClinicArgsObjectSchema)]).optional(),
  cases: z.union([z.boolean(), z.lazy(() => InvoiceCaseFindManySchema)]).optional(),
  payments: z.union([z.boolean(), z.lazy(() => InvoicePaymentFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => InvoiceCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const InvoiceIncludeObjectSchema: z.ZodType<Prisma.InvoiceInclude> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceInclude>;
export const InvoiceIncludeObjectZodSchema = makeSchema();
