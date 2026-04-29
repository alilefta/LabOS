import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  invoiceId: z.string(),
  caseId: z.string()
}).strict();
export const InvoiceCaseInvoiceIdCaseIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.InvoiceCaseInvoiceIdCaseIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseInvoiceIdCaseIdCompoundUniqueInput>;
export const InvoiceCaseInvoiceIdCaseIdCompoundUniqueInputObjectZodSchema = makeSchema();
