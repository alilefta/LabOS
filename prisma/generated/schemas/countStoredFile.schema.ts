import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StoredFileOrderByWithRelationInputObjectSchema as StoredFileOrderByWithRelationInputObjectSchema } from './objects/StoredFileOrderByWithRelationInput.schema';
import { StoredFileWhereInputObjectSchema as StoredFileWhereInputObjectSchema } from './objects/StoredFileWhereInput.schema';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './objects/StoredFileWhereUniqueInput.schema';
import { StoredFileCountAggregateInputObjectSchema as StoredFileCountAggregateInputObjectSchema } from './objects/StoredFileCountAggregateInput.schema';

export const StoredFileCountSchema: z.ZodType<Prisma.StoredFileCountArgs> = z.object({ orderBy: z.union([StoredFileOrderByWithRelationInputObjectSchema, StoredFileOrderByWithRelationInputObjectSchema.array()]).optional(), where: StoredFileWhereInputObjectSchema.optional(), cursor: StoredFileWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), StoredFileCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.StoredFileCountArgs>;

export const StoredFileCountZodSchema = z.object({ orderBy: z.union([StoredFileOrderByWithRelationInputObjectSchema, StoredFileOrderByWithRelationInputObjectSchema.array()]).optional(), where: StoredFileWhereInputObjectSchema.optional(), cursor: StoredFileWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), StoredFileCountAggregateInputObjectSchema ]).optional() }).strict();