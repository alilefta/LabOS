import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ProductAddonOrderByWithRelationInputObjectSchema as ProductAddonOrderByWithRelationInputObjectSchema } from './objects/ProductAddonOrderByWithRelationInput.schema';
import { ProductAddonWhereInputObjectSchema as ProductAddonWhereInputObjectSchema } from './objects/ProductAddonWhereInput.schema';
import { ProductAddonWhereUniqueInputObjectSchema as ProductAddonWhereUniqueInputObjectSchema } from './objects/ProductAddonWhereUniqueInput.schema';
import { ProductAddonCountAggregateInputObjectSchema as ProductAddonCountAggregateInputObjectSchema } from './objects/ProductAddonCountAggregateInput.schema';

export const ProductAddonCountSchema: z.ZodType<Prisma.ProductAddonCountArgs> = z.object({ orderBy: z.union([ProductAddonOrderByWithRelationInputObjectSchema, ProductAddonOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProductAddonWhereInputObjectSchema.optional(), cursor: ProductAddonWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ProductAddonCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ProductAddonCountArgs>;

export const ProductAddonCountZodSchema = z.object({ orderBy: z.union([ProductAddonOrderByWithRelationInputObjectSchema, ProductAddonOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProductAddonWhereInputObjectSchema.optional(), cursor: ProductAddonWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ProductAddonCountAggregateInputObjectSchema ]).optional() }).strict();