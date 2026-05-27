import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  invoiceId: z.literal(true).optional(),
  caseId: z.literal(true).optional(),
  caseTotal: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const InvoiceCaseCountAggregateInputObjectSchema: z.ZodType<Prisma.InvoiceCaseCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseCountAggregateInputType>;
export const InvoiceCaseCountAggregateInputObjectZodSchema = makeSchema();
