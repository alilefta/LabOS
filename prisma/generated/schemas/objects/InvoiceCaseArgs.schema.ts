import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseSelectObjectSchema as InvoiceCaseSelectObjectSchema } from './InvoiceCaseSelect.schema';
import { InvoiceCaseIncludeObjectSchema as InvoiceCaseIncludeObjectSchema } from './InvoiceCaseInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => InvoiceCaseSelectObjectSchema).optional(),
  include: z.lazy(() => InvoiceCaseIncludeObjectSchema).optional()
}).strict();
export const InvoiceCaseArgsObjectSchema = makeSchema();
export const InvoiceCaseArgsObjectZodSchema = makeSchema();
