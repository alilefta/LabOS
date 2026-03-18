import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseCategoryOrderByWithRelationInputObjectSchema as CaseCategoryOrderByWithRelationInputObjectSchema } from './objects/CaseCategoryOrderByWithRelationInput.schema';
import { CaseCategoryWhereInputObjectSchema as CaseCategoryWhereInputObjectSchema } from './objects/CaseCategoryWhereInput.schema';
import { CaseCategoryWhereUniqueInputObjectSchema as CaseCategoryWhereUniqueInputObjectSchema } from './objects/CaseCategoryWhereUniqueInput.schema';
import { CaseCategoryCountAggregateInputObjectSchema as CaseCategoryCountAggregateInputObjectSchema } from './objects/CaseCategoryCountAggregateInput.schema';

export const CaseCategoryCountSchema: z.ZodType<Prisma.CaseCategoryCountArgs> = z.object({ orderBy: z.union([CaseCategoryOrderByWithRelationInputObjectSchema, CaseCategoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseCategoryWhereInputObjectSchema.optional(), cursor: CaseCategoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CaseCategoryCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.CaseCategoryCountArgs>;

export const CaseCategoryCountZodSchema = z.object({ orderBy: z.union([CaseCategoryOrderByWithRelationInputObjectSchema, CaseCategoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseCategoryWhereInputObjectSchema.optional(), cursor: CaseCategoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CaseCategoryCountAggregateInputObjectSchema ]).optional() }).strict();