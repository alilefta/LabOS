import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './objects/CaseWhereInput.schema';
import { CaseOrderByWithAggregationInputObjectSchema as CaseOrderByWithAggregationInputObjectSchema } from './objects/CaseOrderByWithAggregationInput.schema';
import { CaseScalarWhereWithAggregatesInputObjectSchema as CaseScalarWhereWithAggregatesInputObjectSchema } from './objects/CaseScalarWhereWithAggregatesInput.schema';
import { CaseScalarFieldEnumSchema } from './enums/CaseScalarFieldEnum.schema';
import { CaseCountAggregateInputObjectSchema as CaseCountAggregateInputObjectSchema } from './objects/CaseCountAggregateInput.schema';
import { CaseMinAggregateInputObjectSchema as CaseMinAggregateInputObjectSchema } from './objects/CaseMinAggregateInput.schema';
import { CaseMaxAggregateInputObjectSchema as CaseMaxAggregateInputObjectSchema } from './objects/CaseMaxAggregateInput.schema';
import { CaseAvgAggregateInputObjectSchema as CaseAvgAggregateInputObjectSchema } from './objects/CaseAvgAggregateInput.schema';
import { CaseSumAggregateInputObjectSchema as CaseSumAggregateInputObjectSchema } from './objects/CaseSumAggregateInput.schema';

export const CaseGroupBySchema: z.ZodType<Prisma.CaseGroupByArgs> = z.object({ where: CaseWhereInputObjectSchema.optional(), orderBy: z.union([CaseOrderByWithAggregationInputObjectSchema, CaseOrderByWithAggregationInputObjectSchema.array()]).optional(), having: CaseScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(CaseScalarFieldEnumSchema), _count: z.union([ z.literal(true), CaseCountAggregateInputObjectSchema ]).optional(), _min: CaseMinAggregateInputObjectSchema.optional(), _max: CaseMaxAggregateInputObjectSchema.optional(), _avg: CaseAvgAggregateInputObjectSchema.optional(), _sum: CaseSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseGroupByArgs>;

export const CaseGroupByZodSchema = z.object({ where: CaseWhereInputObjectSchema.optional(), orderBy: z.union([CaseOrderByWithAggregationInputObjectSchema, CaseOrderByWithAggregationInputObjectSchema.array()]).optional(), having: CaseScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(CaseScalarFieldEnumSchema), _count: z.union([ z.literal(true), CaseCountAggregateInputObjectSchema ]).optional(), _min: CaseMinAggregateInputObjectSchema.optional(), _max: CaseMaxAggregateInputObjectSchema.optional(), _avg: CaseAvgAggregateInputObjectSchema.optional(), _sum: CaseSumAggregateInputObjectSchema.optional() }).strict();