import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseInvoiceIdCaseIdCompoundUniqueInputObjectSchema as InvoiceCaseInvoiceIdCaseIdCompoundUniqueInputObjectSchema } from './InvoiceCaseInvoiceIdCaseIdCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  caseId: z.string().optional(),
  invoiceId_caseId: z.lazy(() => InvoiceCaseInvoiceIdCaseIdCompoundUniqueInputObjectSchema).optional()
}).strict();
export const InvoiceCaseWhereUniqueInputObjectSchema: z.ZodType<Prisma.InvoiceCaseWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseWhereUniqueInput>;
export const InvoiceCaseWhereUniqueInputObjectZodSchema = makeSchema();
