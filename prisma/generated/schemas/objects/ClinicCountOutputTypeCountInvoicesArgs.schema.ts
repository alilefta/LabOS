import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceWhereInputObjectSchema as InvoiceWhereInputObjectSchema } from './InvoiceWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoiceWhereInputObjectSchema).optional()
}).strict();
export const ClinicCountOutputTypeCountInvoicesArgsObjectSchema = makeSchema();
export const ClinicCountOutputTypeCountInvoicesArgsObjectZodSchema = makeSchema();
