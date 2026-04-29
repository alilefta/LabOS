import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoicePaymentWhereInputObjectSchema as InvoicePaymentWhereInputObjectSchema } from './objects/InvoicePaymentWhereInput.schema';

export const InvoicePaymentDeleteManySchema: z.ZodType<Prisma.InvoicePaymentDeleteManyArgs> = z.object({ where: InvoicePaymentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.InvoicePaymentDeleteManyArgs>;

export const InvoicePaymentDeleteManyZodSchema = z.object({ where: InvoicePaymentWhereInputObjectSchema.optional() }).strict();