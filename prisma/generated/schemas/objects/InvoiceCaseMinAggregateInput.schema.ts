import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  invoiceId: z.literal(true).optional(),
  caseId: z.literal(true).optional(),
  caseTotal: z.literal(true).optional()
}).strict();
export const InvoiceCaseMinAggregateInputObjectSchema: z.ZodType<Prisma.InvoiceCaseMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseMinAggregateInputType>;
export const InvoiceCaseMinAggregateInputObjectZodSchema = makeSchema();
