import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const InvoicePaymentWhereUniqueInputObjectSchema: z.ZodType<Prisma.InvoicePaymentWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentWhereUniqueInput>;
export const InvoicePaymentWhereUniqueInputObjectZodSchema = makeSchema();
