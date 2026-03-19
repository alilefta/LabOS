import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { AuthUserOrderByWithRelationInputObjectSchema as AuthUserOrderByWithRelationInputObjectSchema } from './objects/AuthUserOrderByWithRelationInput.schema';
import { AuthUserWhereInputObjectSchema as AuthUserWhereInputObjectSchema } from './objects/AuthUserWhereInput.schema';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './objects/AuthUserWhereUniqueInput.schema';
import { AuthUserCountAggregateInputObjectSchema as AuthUserCountAggregateInputObjectSchema } from './objects/AuthUserCountAggregateInput.schema';

export const AuthUserCountSchema: z.ZodType<Prisma.AuthUserCountArgs> = z.object({ orderBy: z.union([AuthUserOrderByWithRelationInputObjectSchema, AuthUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: AuthUserWhereInputObjectSchema.optional(), cursor: AuthUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), AuthUserCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.AuthUserCountArgs>;

export const AuthUserCountZodSchema = z.object({ orderBy: z.union([AuthUserOrderByWithRelationInputObjectSchema, AuthUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: AuthUserWhereInputObjectSchema.optional(), cursor: AuthUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), AuthUserCountAggregateInputObjectSchema ]).optional() }).strict();