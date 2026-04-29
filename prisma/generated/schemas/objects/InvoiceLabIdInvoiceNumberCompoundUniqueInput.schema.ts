import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  labId: z.string(),
  invoiceNumber: z.string()
}).strict();
export const InvoiceLabIdInvoiceNumberCompoundUniqueInputObjectSchema: z.ZodType<Prisma.InvoiceLabIdInvoiceNumberCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceLabIdInvoiceNumberCompoundUniqueInput>;
export const InvoiceLabIdInvoiceNumberCompoundUniqueInputObjectZodSchema = makeSchema();
