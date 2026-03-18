import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseAssetFileOrderByWithRelationInputObjectSchema as CaseAssetFileOrderByWithRelationInputObjectSchema } from './objects/CaseAssetFileOrderByWithRelationInput.schema';
import { CaseAssetFileWhereInputObjectSchema as CaseAssetFileWhereInputObjectSchema } from './objects/CaseAssetFileWhereInput.schema';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './objects/CaseAssetFileWhereUniqueInput.schema';
import { CaseAssetFileCountAggregateInputObjectSchema as CaseAssetFileCountAggregateInputObjectSchema } from './objects/CaseAssetFileCountAggregateInput.schema';

export const CaseAssetFileCountSchema: z.ZodType<Prisma.CaseAssetFileCountArgs> = z.object({ orderBy: z.union([CaseAssetFileOrderByWithRelationInputObjectSchema, CaseAssetFileOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseAssetFileWhereInputObjectSchema.optional(), cursor: CaseAssetFileWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CaseAssetFileCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.CaseAssetFileCountArgs>;

export const CaseAssetFileCountZodSchema = z.object({ orderBy: z.union([CaseAssetFileOrderByWithRelationInputObjectSchema, CaseAssetFileOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseAssetFileWhereInputObjectSchema.optional(), cursor: CaseAssetFileWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CaseAssetFileCountAggregateInputObjectSchema ]).optional() }).strict();