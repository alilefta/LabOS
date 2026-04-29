import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoicePaymentCreateManyInputObjectSchema as InvoicePaymentCreateManyInputObjectSchema } from './objects/InvoicePaymentCreateManyInput.schema';

export const InvoicePaymentCreateManySchema: z.ZodType<Prisma.InvoicePaymentCreateManyArgs> = z.object({ data: z.union([ InvoicePaymentCreateManyInputObjectSchema, z.array(InvoicePaymentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.InvoicePaymentCreateManyArgs>;

export const InvoicePaymentCreateManyZodSchema = z.object({ data: z.union([ InvoicePaymentCreateManyInputObjectSchema, z.array(InvoicePaymentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();