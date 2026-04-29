import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoicePaymentWhereInputObjectSchema as InvoicePaymentWhereInputObjectSchema } from './InvoicePaymentWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoicePaymentWhereInputObjectSchema).optional()
}).strict();
export const InvoiceCountOutputTypeCountPaymentsArgsObjectSchema = makeSchema();
export const InvoiceCountOutputTypeCountPaymentsArgsObjectZodSchema = makeSchema();
