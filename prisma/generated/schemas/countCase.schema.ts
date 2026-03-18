import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseOrderByWithRelationInputObjectSchema as CaseOrderByWithRelationInputObjectSchema } from './objects/CaseOrderByWithRelationInput.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './objects/CaseWhereInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './objects/CaseWhereUniqueInput.schema';
import { CaseCountAggregateInputObjectSchema as CaseCountAggregateInputObjectSchema } from './objects/CaseCountAggregateInput.schema';

export const CaseCountSchema: z.ZodType<Prisma.CaseCountArgs> = z.object({ orderBy: z.union([CaseOrderByWithRelationInputObjectSchema, CaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseWhereInputObjectSchema.optional(), cursor: CaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CaseCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.CaseCountArgs>;

export const CaseCountZodSchema = z.object({ orderBy: z.union([CaseOrderByWithRelationInputObjectSchema, CaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseWhereInputObjectSchema.optional(), cursor: CaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CaseCountAggregateInputObjectSchema ]).optional() }).strict();