import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoicePaymentOrderByWithRelationInputObjectSchema as InvoicePaymentOrderByWithRelationInputObjectSchema } from './objects/InvoicePaymentOrderByWithRelationInput.schema';
import { InvoicePaymentWhereInputObjectSchema as InvoicePaymentWhereInputObjectSchema } from './objects/InvoicePaymentWhereInput.schema';
import { InvoicePaymentWhereUniqueInputObjectSchema as InvoicePaymentWhereUniqueInputObjectSchema } from './objects/InvoicePaymentWhereUniqueInput.schema';
import { InvoicePaymentCountAggregateInputObjectSchema as InvoicePaymentCountAggregateInputObjectSchema } from './objects/InvoicePaymentCountAggregateInput.schema';

export const InvoicePaymentCountSchema: z.ZodType<Prisma.InvoicePaymentCountArgs> = z.object({ orderBy: z.union([InvoicePaymentOrderByWithRelationInputObjectSchema, InvoicePaymentOrderByWithRelationInputObjectSchema.array()]).optional(), where: InvoicePaymentWhereInputObjectSchema.optional(), cursor: InvoicePaymentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), InvoicePaymentCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.InvoicePaymentCountArgs>;

export const InvoicePaymentCountZodSchema = z.object({ orderBy: z.union([InvoicePaymentOrderByWithRelationInputObjectSchema, InvoicePaymentOrderByWithRelationInputObjectSchema.array()]).optional(), where: InvoicePaymentWhereInputObjectSchema.optional(), cursor: InvoicePaymentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), InvoicePaymentCountAggregateInputObjectSchema ]).optional() }).strict();