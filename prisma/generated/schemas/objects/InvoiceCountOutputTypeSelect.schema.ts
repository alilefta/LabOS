import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCountOutputTypeCountCasesArgsObjectSchema as InvoiceCountOutputTypeCountCasesArgsObjectSchema } from './InvoiceCountOutputTypeCountCasesArgs.schema';
import { InvoiceCountOutputTypeCountPaymentsArgsObjectSchema as InvoiceCountOutputTypeCountPaymentsArgsObjectSchema } from './InvoiceCountOutputTypeCountPaymentsArgs.schema'

const makeSchema = () => z.object({
  cases: z.union([z.boolean(), z.lazy(() => InvoiceCountOutputTypeCountCasesArgsObjectSchema)]).optional(),
  payments: z.union([z.boolean(), z.lazy(() => InvoiceCountOutputTypeCountPaymentsArgsObjectSchema)]).optional()
}).strict();
export const InvoiceCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.InvoiceCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCountOutputTypeSelect>;
export const InvoiceCountOutputTypeSelectObjectZodSchema = makeSchema();
