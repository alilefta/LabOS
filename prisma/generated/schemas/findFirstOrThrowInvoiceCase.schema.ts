import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoiceCaseIncludeObjectSchema as InvoiceCaseIncludeObjectSchema } from './objects/InvoiceCaseInclude.schema';
import { InvoiceCaseOrderByWithRelationInputObjectSchema as InvoiceCaseOrderByWithRelationInputObjectSchema } from './objects/InvoiceCaseOrderByWithRelationInput.schema';
import { InvoiceCaseWhereInputObjectSchema as InvoiceCaseWhereInputObjectSchema } from './objects/InvoiceCaseWhereInput.schema';
import { InvoiceCaseWhereUniqueInputObjectSchema as InvoiceCaseWhereUniqueInputObjectSchema } from './objects/InvoiceCaseWhereUniqueInput.schema';
import { InvoiceCaseScalarFieldEnumSchema } from './enums/InvoiceCaseScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const InvoiceCaseFindFirstOrThrowSelectSchema: z.ZodType<Prisma.InvoiceCaseSelect> = z.object({
    invoiceId: z.boolean().optional(),
    invoice: z.boolean().optional(),
    caseId: z.boolean().optional(),
    case: z.boolean().optional(),
    caseTotal: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.InvoiceCaseSelect>;

export const InvoiceCaseFindFirstOrThrowSelectZodSchema = z.object({
    invoiceId: z.boolean().optional(),
    invoice: z.boolean().optional(),
    caseId: z.boolean().optional(),
    case: z.boolean().optional(),
    caseTotal: z.boolean().optional()
  }).strict();

export const InvoiceCaseFindFirstOrThrowSchema: z.ZodType<Prisma.InvoiceCaseFindFirstOrThrowArgs> = z.object({ select: InvoiceCaseFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => InvoiceCaseIncludeObjectSchema.optional()), orderBy: z.union([InvoiceCaseOrderByWithRelationInputObjectSchema, InvoiceCaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: InvoiceCaseWhereInputObjectSchema.optional(), cursor: InvoiceCaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([InvoiceCaseScalarFieldEnumSchema, InvoiceCaseScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.InvoiceCaseFindFirstOrThrowArgs>;

export const InvoiceCaseFindFirstOrThrowZodSchema = z.object({ select: InvoiceCaseFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => InvoiceCaseIncludeObjectSchema.optional()), orderBy: z.union([InvoiceCaseOrderByWithRelationInputObjectSchema, InvoiceCaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: InvoiceCaseWhereInputObjectSchema.optional(), cursor: InvoiceCaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([InvoiceCaseScalarFieldEnumSchema, InvoiceCaseScalarFieldEnumSchema.array()]).optional() }).strict();