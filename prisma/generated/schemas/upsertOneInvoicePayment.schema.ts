import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoicePaymentSelectObjectSchema as InvoicePaymentSelectObjectSchema } from './objects/InvoicePaymentSelect.schema';
import { InvoicePaymentIncludeObjectSchema as InvoicePaymentIncludeObjectSchema } from './objects/InvoicePaymentInclude.schema';
import { InvoicePaymentWhereUniqueInputObjectSchema as InvoicePaymentWhereUniqueInputObjectSchema } from './objects/InvoicePaymentWhereUniqueInput.schema';
import { InvoicePaymentCreateInputObjectSchema as InvoicePaymentCreateInputObjectSchema } from './objects/InvoicePaymentCreateInput.schema';
import { InvoicePaymentUncheckedCreateInputObjectSchema as InvoicePaymentUncheckedCreateInputObjectSchema } from './objects/InvoicePaymentUncheckedCreateInput.schema';
import { InvoicePaymentUpdateInputObjectSchema as InvoicePaymentUpdateInputObjectSchema } from './objects/InvoicePaymentUpdateInput.schema';
import { InvoicePaymentUncheckedUpdateInputObjectSchema as InvoicePaymentUncheckedUpdateInputObjectSchema } from './objects/InvoicePaymentUncheckedUpdateInput.schema';

export const InvoicePaymentUpsertOneSchema: z.ZodType<Prisma.InvoicePaymentUpsertArgs> = z.object({ select: InvoicePaymentSelectObjectSchema.optional(), include: InvoicePaymentIncludeObjectSchema.optional(), where: InvoicePaymentWhereUniqueInputObjectSchema, create: z.union([ InvoicePaymentCreateInputObjectSchema, InvoicePaymentUncheckedCreateInputObjectSchema ]), update: z.union([ InvoicePaymentUpdateInputObjectSchema, InvoicePaymentUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.InvoicePaymentUpsertArgs>;

export const InvoicePaymentUpsertOneZodSchema = z.object({ select: InvoicePaymentSelectObjectSchema.optional(), include: InvoicePaymentIncludeObjectSchema.optional(), where: InvoicePaymentWhereUniqueInputObjectSchema, create: z.union([ InvoicePaymentCreateInputObjectSchema, InvoicePaymentUncheckedCreateInputObjectSchema ]), update: z.union([ InvoicePaymentUpdateInputObjectSchema, InvoicePaymentUncheckedUpdateInputObjectSchema ]) }).strict();