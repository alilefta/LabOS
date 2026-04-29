import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceArgsObjectSchema as InvoiceArgsObjectSchema } from './InvoiceArgs.schema';
import { CaseArgsObjectSchema as CaseArgsObjectSchema } from './CaseArgs.schema'

const makeSchema = () => z.object({
  invoice: z.union([z.boolean(), z.lazy(() => InvoiceArgsObjectSchema)]).optional(),
  case: z.union([z.boolean(), z.lazy(() => CaseArgsObjectSchema)]).optional()
}).strict();
export const InvoiceCaseIncludeObjectSchema: z.ZodType<Prisma.InvoiceCaseInclude> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseInclude>;
export const InvoiceCaseIncludeObjectZodSchema = makeSchema();
