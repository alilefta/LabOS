import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoicePaymentUpdateManyMutationInputObjectSchema as InvoicePaymentUpdateManyMutationInputObjectSchema } from './objects/InvoicePaymentUpdateManyMutationInput.schema';
import { InvoicePaymentWhereInputObjectSchema as InvoicePaymentWhereInputObjectSchema } from './objects/InvoicePaymentWhereInput.schema';

export const InvoicePaymentUpdateManySchema: z.ZodType<Prisma.InvoicePaymentUpdateManyArgs> = z.object({ data: InvoicePaymentUpdateManyMutationInputObjectSchema, where: InvoicePaymentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.InvoicePaymentUpdateManyArgs>;

export const InvoicePaymentUpdateManyZodSchema = z.object({ data: InvoicePaymentUpdateManyMutationInputObjectSchema, where: InvoicePaymentWhereInputObjectSchema.optional() }).strict();