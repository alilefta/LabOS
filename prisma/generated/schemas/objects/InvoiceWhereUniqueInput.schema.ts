import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceLabIdInvoiceNumberCompoundUniqueInputObjectSchema as InvoiceLabIdInvoiceNumberCompoundUniqueInputObjectSchema } from './InvoiceLabIdInvoiceNumberCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  publicToken: z.string().optional(),
  labId_invoiceNumber: z.lazy(() => InvoiceLabIdInvoiceNumberCompoundUniqueInputObjectSchema).optional()
}).strict();
export const InvoiceWhereUniqueInputObjectSchema: z.ZodType<Prisma.InvoiceWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceWhereUniqueInput>;
export const InvoiceWhereUniqueInputObjectZodSchema = makeSchema();
