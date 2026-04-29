import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoicePaymentSelectObjectSchema as InvoicePaymentSelectObjectSchema } from './objects/InvoicePaymentSelect.schema';
import { InvoicePaymentIncludeObjectSchema as InvoicePaymentIncludeObjectSchema } from './objects/InvoicePaymentInclude.schema';
import { InvoicePaymentWhereUniqueInputObjectSchema as InvoicePaymentWhereUniqueInputObjectSchema } from './objects/InvoicePaymentWhereUniqueInput.schema';

export const InvoicePaymentDeleteOneSchema: z.ZodType<Prisma.InvoicePaymentDeleteArgs> = z.object({ select: InvoicePaymentSelectObjectSchema.optional(), include: InvoicePaymentIncludeObjectSchema.optional(), where: InvoicePaymentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.InvoicePaymentDeleteArgs>;

export const InvoicePaymentDeleteOneZodSchema = z.object({ select: InvoicePaymentSelectObjectSchema.optional(), include: InvoicePaymentIncludeObjectSchema.optional(), where: InvoicePaymentWhereUniqueInputObjectSchema }).strict();