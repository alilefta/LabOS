import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { MemberOrderByWithRelationInputObjectSchema as MemberOrderByWithRelationInputObjectSchema } from './objects/MemberOrderByWithRelationInput.schema';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './objects/MemberWhereInput.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './objects/MemberWhereUniqueInput.schema';
import { MemberCountAggregateInputObjectSchema as MemberCountAggregateInputObjectSchema } from './objects/MemberCountAggregateInput.schema';

export const MemberCountSchema: z.ZodType<Prisma.MemberCountArgs> = z.object({ orderBy: z.union([MemberOrderByWithRelationInputObjectSchema, MemberOrderByWithRelationInputObjectSchema.array()]).optional(), where: MemberWhereInputObjectSchema.optional(), cursor: MemberWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), MemberCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.MemberCountArgs>;

export const MemberCountZodSchema = z.object({ orderBy: z.union([MemberOrderByWithRelationInputObjectSchema, MemberOrderByWithRelationInputObjectSchema.array()]).optional(), where: MemberWhereInputObjectSchema.optional(), cursor: MemberWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), MemberCountAggregateInputObjectSchema ]).optional() }).strict();