import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoicePaymentSelectObjectSchema as InvoicePaymentSelectObjectSchema } from './objects/InvoicePaymentSelect.schema';
import { InvoicePaymentIncludeObjectSchema as InvoicePaymentIncludeObjectSchema } from './objects/InvoicePaymentInclude.schema';
import { InvoicePaymentCreateInputObjectSchema as InvoicePaymentCreateInputObjectSchema } from './objects/InvoicePaymentCreateInput.schema';
import { InvoicePaymentUncheckedCreateInputObjectSchema as InvoicePaymentUncheckedCreateInputObjectSchema } from './objects/InvoicePaymentUncheckedCreateInput.schema';

export const InvoicePaymentCreateOneSchema: z.ZodType<Prisma.InvoicePaymentCreateArgs> = z.object({ select: InvoicePaymentSelectObjectSchema.optional(), include: InvoicePaymentIncludeObjectSchema.optional(), data: z.union([InvoicePaymentCreateInputObjectSchema, InvoicePaymentUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.InvoicePaymentCreateArgs>;

export const InvoicePaymentCreateOneZodSchema = z.object({ select: InvoicePaymentSelectObjectSchema.optional(), include: InvoicePaymentIncludeObjectSchema.optional(), data: z.union([InvoicePaymentCreateInputObjectSchema, InvoicePaymentUncheckedCreateInputObjectSchema]) }).strict();