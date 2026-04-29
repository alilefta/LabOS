import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoicePaymentIncludeObjectSchema as InvoicePaymentIncludeObjectSchema } from './objects/InvoicePaymentInclude.schema';
import { InvoicePaymentOrderByWithRelationInputObjectSchema as InvoicePaymentOrderByWithRelationInputObjectSchema } from './objects/InvoicePaymentOrderByWithRelationInput.schema';
import { InvoicePaymentWhereInputObjectSchema as InvoicePaymentWhereInputObjectSchema } from './objects/InvoicePaymentWhereInput.schema';
import { InvoicePaymentWhereUniqueInputObjectSchema as InvoicePaymentWhereUniqueInputObjectSchema } from './objects/InvoicePaymentWhereUniqueInput.schema';
import { InvoicePaymentScalarFieldEnumSchema } from './enums/InvoicePaymentScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const InvoicePaymentFindManySelectSchema: z.ZodType<Prisma.InvoicePaymentSelect> = z.object({
    id: z.boolean().optional(),
    invoiceId: z.boolean().optional(),
    invoice: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    amount: z.boolean().optional(),
    method: z.boolean().optional(),
    reference: z.boolean().optional(),
    notes: z.boolean().optional(),
    paidAt: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.InvoicePaymentSelect>;

export const InvoicePaymentFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    invoiceId: z.boolean().optional(),
    invoice: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    amount: z.boolean().optional(),
    method: z.boolean().optional(),
    reference: z.boolean().optional(),
    notes: z.boolean().optional(),
    paidAt: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const InvoicePaymentFindManySchema: z.ZodType<Prisma.InvoicePaymentFindManyArgs> = z.object({ select: InvoicePaymentFindManySelectSchema.optional(), include: z.lazy(() => InvoicePaymentIncludeObjectSchema.optional()), orderBy: z.union([InvoicePaymentOrderByWithRelationInputObjectSchema, InvoicePaymentOrderByWithRelationInputObjectSchema.array()]).optional(), where: InvoicePaymentWhereInputObjectSchema.optional(), cursor: InvoicePaymentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([InvoicePaymentScalarFieldEnumSchema, InvoicePaymentScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.InvoicePaymentFindManyArgs>;

export const InvoicePaymentFindManyZodSchema = z.object({ select: InvoicePaymentFindManySelectSchema.optional(), include: z.lazy(() => InvoicePaymentIncludeObjectSchema.optional()), orderBy: z.union([InvoicePaymentOrderByWithRelationInputObjectSchema, InvoicePaymentOrderByWithRelationInputObjectSchema.array()]).optional(), where: InvoicePaymentWhereInputObjectSchema.optional(), cursor: InvoicePaymentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([InvoicePaymentScalarFieldEnumSchema, InvoicePaymentScalarFieldEnumSchema.array()]).optional() }).strict();