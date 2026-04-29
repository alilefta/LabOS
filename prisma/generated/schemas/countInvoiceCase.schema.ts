import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvoiceCaseOrderByWithRelationInputObjectSchema as InvoiceCaseOrderByWithRelationInputObjectSchema } from './objects/InvoiceCaseOrderByWithRelationInput.schema';
import { InvoiceCaseWhereInputObjectSchema as InvoiceCaseWhereInputObjectSchema } from './objects/InvoiceCaseWhereInput.schema';
import { InvoiceCaseWhereUniqueInputObjectSchema as InvoiceCaseWhereUniqueInputObjectSchema } from './objects/InvoiceCaseWhereUniqueInput.schema';
import { InvoiceCaseCountAggregateInputObjectSchema as InvoiceCaseCountAggregateInputObjectSchema } from './objects/InvoiceCaseCountAggregateInput.schema';

export const InvoiceCaseCountSchema: z.ZodType<Prisma.InvoiceCaseCountArgs> = z.object({ orderBy: z.union([InvoiceCaseOrderByWithRelationInputObjectSchema, InvoiceCaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: InvoiceCaseWhereInputObjectSchema.optional(), cursor: InvoiceCaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), InvoiceCaseCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.InvoiceCaseCountArgs>;

export const InvoiceCaseCountZodSchema = z.object({ orderBy: z.union([InvoiceCaseOrderByWithRelationInputObjectSchema, InvoiceCaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: InvoiceCaseWhereInputObjectSchema.optional(), cursor: InvoiceCaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), InvoiceCaseCountAggregateInputObjectSchema ]).optional() }).strict();