import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './objects/MemberWhereInput.schema';
import { MemberOrderByWithAggregationInputObjectSchema as MemberOrderByWithAggregationInputObjectSchema } from './objects/MemberOrderByWithAggregationInput.schema';
import { MemberScalarWhereWithAggregatesInputObjectSchema as MemberScalarWhereWithAggregatesInputObjectSchema } from './objects/MemberScalarWhereWithAggregatesInput.schema';
import { MemberScalarFieldEnumSchema } from './enums/MemberScalarFieldEnum.schema';
import { MemberCountAggregateInputObjectSchema as MemberCountAggregateInputObjectSchema } from './objects/MemberCountAggregateInput.schema';
import { MemberMinAggregateInputObjectSchema as MemberMinAggregateInputObjectSchema } from './objects/MemberMinAggregateInput.schema';
import { MemberMaxAggregateInputObjectSchema as MemberMaxAggregateInputObjectSchema } from './objects/MemberMaxAggregateInput.schema';

export const MemberGroupBySchema: z.ZodType<Prisma.MemberGroupByArgs> = z.object({ where: MemberWhereInputObjectSchema.optional(), orderBy: z.union([MemberOrderByWithAggregationInputObjectSchema, MemberOrderByWithAggregationInputObjectSchema.array()]).optional(), having: MemberScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(MemberScalarFieldEnumSchema), _count: z.union([ z.literal(true), MemberCountAggregateInputObjectSchema ]).optional(), _min: MemberMinAggregateInputObjectSchema.optional(), _max: MemberMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.MemberGroupByArgs>;

export const MemberGroupByZodSchema = z.object({ where: MemberWhereInputObjectSchema.optional(), orderBy: z.union([MemberOrderByWithAggregationInputObjectSchema, MemberOrderByWithAggregationInputObjectSchema.array()]).optional(), having: MemberScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(MemberScalarFieldEnumSchema), _count: z.union([ z.literal(true), MemberCountAggregateInputObjectSchema ]).optional(), _min: MemberMinAggregateInputObjectSchema.optional(), _max: MemberMaxAggregateInputObjectSchema.optional() }).strict();