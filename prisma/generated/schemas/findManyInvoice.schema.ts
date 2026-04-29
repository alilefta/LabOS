import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoiceIncludeObjectSchema as InvoiceIncludeObjectSchema } from './objects/InvoiceInclude.schema';
import { InvoiceOrderByWithRelationInputObjectSchema as InvoiceOrderByWithRelationInputObjectSchema } from './objects/InvoiceOrderByWithRelationInput.schema';
import { InvoiceWhereInputObjectSchema as InvoiceWhereInputObjectSchema } from './objects/InvoiceWhereInput.schema';
import { InvoiceWhereUniqueInputObjectSchema as InvoiceWhereUniqueInputObjectSchema } from './objects/InvoiceWhereUniqueInput.schema';
import { InvoiceScalarFieldEnumSchema } from './enums/InvoiceScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const InvoiceFindManySelectSchema: z.ZodType<Prisma.InvoiceSelect> = z.object({
    id: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    clinicId: z.boolean().optional(),
    clinic: z.boolean().optional(),
    invoiceNumber: z.boolean().optional(),
    status: z.boolean().optional(),
    notes: z.boolean().optional(),
    subtotal: z.boolean().optional(),
    discountAmount: z.boolean().optional(),
    total: z.boolean().optional(),
    amountPaid: z.boolean().optional(),
    amountDue: z.boolean().optional(),
    issuedAt: z.boolean().optional(),
    dueDate: z.boolean().optional(),
    publicToken: z.boolean().optional(),
    publicLinkExpiresAt: z.boolean().optional(),
    cases: z.boolean().optional(),
    payments: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.InvoiceSelect>;

export const InvoiceFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    clinicId: z.boolean().optional(),
    clinic: z.boolean().optional(),
    invoiceNumber: z.boolean().optional(),
    status: z.boolean().optional(),
    notes: z.boolean().optional(),
    subtotal: z.boolean().optional(),
    discountAmount: z.boolean().optional(),
    total: z.boolean().optional(),
    amountPaid: z.boolean().optional(),
    amountDue: z.boolean().optional(),
    issuedAt: z.boolean().optional(),
    dueDate: z.boolean().optional(),
    publicToken: z.boolean().optional(),
    publicLinkExpiresAt: z.boolean().optional(),
    cases: z.boolean().optional(),
    payments: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const InvoiceFindManySchema: z.ZodType<Prisma.InvoiceFindManyArgs> = z.object({ select: InvoiceFindManySelectSchema.optional(), include: z.lazy(() => InvoiceIncludeObjectSchema.optional()), orderBy: z.union([InvoiceOrderByWithRelationInputObjectSchema, InvoiceOrderByWithRelationInputObjectSchema.array()]).optional(), where: InvoiceWhereInputObjectSchema.optional(), cursor: InvoiceWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([InvoiceScalarFieldEnumSchema, InvoiceScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.InvoiceFindManyArgs>;

export const InvoiceFindManyZodSchema = z.object({ select: InvoiceFindManySelectSchema.optional(), include: z.lazy(() => InvoiceIncludeObjectSchema.optional()), orderBy: z.union([InvoiceOrderByWithRelationInputObjectSchema, InvoiceOrderByWithRelationInputObjectSchema.array()]).optional(), where: InvoiceWhereInputObjectSchema.optional(), cursor: InvoiceWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([InvoiceScalarFieldEnumSchema, InvoiceScalarFieldEnumSchema.array()]).optional() }).strict();