import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoicePaymentSelectObjectSchema as InvoicePaymentSelectObjectSchema } from './objects/InvoicePaymentSelect.schema';
import { InvoicePaymentCreateManyInputObjectSchema as InvoicePaymentCreateManyInputObjectSchema } from './objects/InvoicePaymentCreateManyInput.schema';

export const InvoicePaymentCreateManyAndReturnSchema: z.ZodType<Prisma.InvoicePaymentCreateManyAndReturnArgs> = z.object({ select: InvoicePaymentSelectObjectSchema.optional(), data: z.union([ InvoicePaymentCreateManyInputObjectSchema, z.array(InvoicePaymentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.InvoicePaymentCreateManyAndReturnArgs>;

export const InvoicePaymentCreateManyAndReturnZodSchema = z.object({ select: InvoicePaymentSelectObjectSchema.optional(), data: z.union([ InvoicePaymentCreateManyInputObjectSchema, z.array(InvoicePaymentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();