import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoicePaymentWhereInputObjectSchema as InvoicePaymentWhereInputObjectSchema } from './InvoicePaymentWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => InvoicePaymentWhereInputObjectSchema).optional(),
  some: z.lazy(() => InvoicePaymentWhereInputObjectSchema).optional(),
  none: z.lazy(() => InvoicePaymentWhereInputObjectSchema).optional()
}).strict();
export const InvoicePaymentListRelationFilterObjectSchema: z.ZodType<Prisma.InvoicePaymentListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentListRelationFilter>;
export const InvoicePaymentListRelationFilterObjectZodSchema = makeSchema();
