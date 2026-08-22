import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { MemberOrderByWithRelationInputObjectSchema as MemberOrderByWithRelationInputObjectSchema } from './objects/MemberOrderByWithRelationInput.schema';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './objects/MemberWhereInput.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './objects/MemberWhereUniqueInput.schema';
import { MemberCountAggregateInputObjectSchema as MemberCountAggregateInputObjectSchema } from './objects/MemberCountAggregateInput.schema';
import { MemberMinAggregateInputObjectSchema as MemberMinAggregateInputObjectSchema } from './objects/MemberMinAggregateInput.schema';
import { MemberMaxAggregateInputObjectSchema as MemberMaxAggregateInputObjectSchema } from './objects/MemberMaxAggregateInput.schema';

export const MemberAggregateSchema: z.ZodType<Prisma.MemberAggregateArgs> = z.object({ orderBy: z.union([MemberOrderByWithRelationInputObjectSchema, MemberOrderByWithRelationInputObjectSchema.array()]).optional(), where: MemberWhereInputObjectSchema.optional(), cursor: MemberWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), MemberCountAggregateInputObjectSchema ]).optional(), _min: MemberMinAggregateInputObjectSchema.optional(), _max: MemberMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.MemberAggregateArgs>;

export const MemberAggregateZodSchema = z.object({ orderBy: z.union([MemberOrderByWithRelationInputObjectSchema, MemberOrderByWithRelationInputObjectSchema.array()]).optional(), where: MemberWhereInputObjectSchema.optional(), cursor: MemberWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), MemberCountAggregateInputObjectSchema ]).optional(), _min: MemberMinAggregateInputObjectSchema.optional(), _max: MemberMaxAggregateInputObjectSchema.optional() }).strict();