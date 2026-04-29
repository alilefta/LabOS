import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseWhereInputObjectSchema as InvoiceCaseWhereInputObjectSchema } from './InvoiceCaseWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoiceCaseWhereInputObjectSchema).optional()
}).strict();
export const InvoiceCountOutputTypeCountCasesArgsObjectSchema = makeSchema();
export const InvoiceCountOutputTypeCountCasesArgsObjectZodSchema = makeSchema();
