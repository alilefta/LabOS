import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoicePaymentSelectObjectSchema as InvoicePaymentSelectObjectSchema } from './objects/InvoicePaymentSelect.schema';
import { InvoicePaymentIncludeObjectSchema as InvoicePaymentIncludeObjectSchema } from './objects/InvoicePaymentInclude.schema';
import { InvoicePaymentUpdateInputObjectSchema as InvoicePaymentUpdateInputObjectSchema } from './objects/InvoicePaymentUpdateInput.schema';
import { InvoicePaymentUncheckedUpdateInputObjectSchema as InvoicePaymentUncheckedUpdateInputObjectSchema } from './objects/InvoicePaymentUncheckedUpdateInput.schema';
import { InvoicePaymentWhereUniqueInputObjectSchema as InvoicePaymentWhereUniqueInputObjectSchema } from './objects/InvoicePaymentWhereUniqueInput.schema';

export const InvoicePaymentUpdateOneSchema: z.ZodType<Prisma.InvoicePaymentUpdateArgs> = z.object({ select: InvoicePaymentSelectObjectSchema.optional(), include: InvoicePaymentIncludeObjectSchema.optional(), data: z.union([InvoicePaymentUpdateInputObjectSchema, InvoicePaymentUncheckedUpdateInputObjectSchema]), where: InvoicePaymentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.InvoicePaymentUpdateArgs>;

export const InvoicePaymentUpdateOneZodSchema = z.object({ select: InvoicePaymentSelectObjectSchema.optional(), include: InvoicePaymentIncludeObjectSchema.optional(), data: z.union([InvoicePaymentUpdateInputObjectSchema, InvoicePaymentUncheckedUpdateInputObjectSchema]), where: InvoicePaymentWhereUniqueInputObjectSchema }).strict();