import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoicePaymentSelectObjectSchema as InvoicePaymentSelectObjectSchema } from './objects/InvoicePaymentSelect.schema';
import { InvoicePaymentUpdateManyMutationInputObjectSchema as InvoicePaymentUpdateManyMutationInputObjectSchema } from './objects/InvoicePaymentUpdateManyMutationInput.schema';
import { InvoicePaymentWhereInputObjectSchema as InvoicePaymentWhereInputObjectSchema } from './objects/InvoicePaymentWhereInput.schema';

export const InvoicePaymentUpdateManyAndReturnSchema: z.ZodType<Prisma.InvoicePaymentUpdateManyAndReturnArgs> = z.object({ select: InvoicePaymentSelectObjectSchema.optional(), data: InvoicePaymentUpdateManyMutationInputObjectSchema, where: InvoicePaymentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.InvoicePaymentUpdateManyAndReturnArgs>;

export const InvoicePaymentUpdateManyAndReturnZodSchema = z.object({ select: InvoicePaymentSelectObjectSchema.optional(), data: InvoicePaymentUpdateManyMutationInputObjectSchema, where: InvoicePaymentWhereInputObjectSchema.optional() }).strict();