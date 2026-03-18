import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseOrderByWithRelationInputObjectSchema as CaseOrderByWithRelationInputObjectSchema } from './objects/CaseOrderByWithRelationInput.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './objects/CaseWhereInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './objects/CaseWhereUniqueInput.schema';
import { CaseCountAggregateInputObjectSchema as CaseCountAggregateInputObjectSchema } from './objects/CaseCountAggregateInput.schema';
import { CaseMinAggregateInputObjectSchema as CaseMinAggregateInputObjectSchema } from './objects/CaseMinAggregateInput.schema';
import { CaseMaxAggregateInputObjectSchema as CaseMaxAggregateInputObjectSchema } from './objects/CaseMaxAggregateInput.schema';
import { CaseAvgAggregateInputObjectSchema as CaseAvgAggregateInputObjectSchema } from './objects/CaseAvgAggregateInput.schema';
import { CaseSumAggregateInputObjectSchema as CaseSumAggregateInputObjectSchema } from './objects/CaseSumAggregateInput.schema';

export const CaseAggregateSchema: z.ZodType<Prisma.CaseAggregateArgs> = z.object({ orderBy: z.union([CaseOrderByWithRelationInputObjectSchema, CaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseWhereInputObjectSchema.optional(), cursor: CaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), CaseCountAggregateInputObjectSchema ]).optional(), _min: CaseMinAggregateInputObjectSchema.optional(), _max: CaseMaxAggregateInputObjectSchema.optional(), _avg: CaseAvgAggregateInputObjectSchema.optional(), _sum: CaseSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseAggregateArgs>;

export const CaseAggregateZodSchema = z.object({ orderBy: z.union([CaseOrderByWithRelationInputObjectSchema, CaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseWhereInputObjectSchema.optional(), cursor: CaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), CaseCountAggregateInputObjectSchema ]).optional(), _min: CaseMinAggregateInputObjectSchema.optional(), _max: CaseMaxAggregateInputObjectSchema.optional(), _avg: CaseAvgAggregateInputObjectSchema.optional(), _sum: CaseSumAggregateInputObjectSchema.optional() }).strict();