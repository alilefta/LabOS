import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  invoiceId: z.literal(true).optional(),
  caseId: z.literal(true).optional(),
  caseTotal: z.literal(true).optional()
}).strict();
export const InvoiceCaseMaxAggregateInputObjectSchema: z.ZodType<Prisma.InvoiceCaseMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseMaxAggregateInputType>;
export const InvoiceCaseMaxAggregateInputObjectZodSchema = makeSchema();
