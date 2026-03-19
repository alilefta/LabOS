import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { AuthUserOrderByWithRelationInputObjectSchema as AuthUserOrderByWithRelationInputObjectSchema } from './objects/AuthUserOrderByWithRelationInput.schema';
import { AuthUserWhereInputObjectSchema as AuthUserWhereInputObjectSchema } from './objects/AuthUserWhereInput.schema';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './objects/AuthUserWhereUniqueInput.schema';
import { AuthUserCountAggregateInputObjectSchema as AuthUserCountAggregateInputObjectSchema } from './objects/AuthUserCountAggregateInput.schema';
import { AuthUserMinAggregateInputObjectSchema as AuthUserMinAggregateInputObjectSchema } from './objects/AuthUserMinAggregateInput.schema';
import { AuthUserMaxAggregateInputObjectSchema as AuthUserMaxAggregateInputObjectSchema } from './objects/AuthUserMaxAggregateInput.schema';

export const AuthUserAggregateSchema: z.ZodType<Prisma.AuthUserAggregateArgs> = z.object({ orderBy: z.union([AuthUserOrderByWithRelationInputObjectSchema, AuthUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: AuthUserWhereInputObjectSchema.optional(), cursor: AuthUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), AuthUserCountAggregateInputObjectSchema ]).optional(), _min: AuthUserMinAggregateInputObjectSchema.optional(), _max: AuthUserMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AuthUserAggregateArgs>;

export const AuthUserAggregateZodSchema = z.object({ orderBy: z.union([AuthUserOrderByWithRelationInputObjectSchema, AuthUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: AuthUserWhereInputObjectSchema.optional(), cursor: AuthUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), AuthUserCountAggregateInputObjectSchema ]).optional(), _min: AuthUserMinAggregateInputObjectSchema.optional(), _max: AuthUserMaxAggregateInputObjectSchema.optional() }).strict();