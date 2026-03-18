import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SuperUserOrderByWithRelationInputObjectSchema as SuperUserOrderByWithRelationInputObjectSchema } from './objects/SuperUserOrderByWithRelationInput.schema';
import { SuperUserWhereInputObjectSchema as SuperUserWhereInputObjectSchema } from './objects/SuperUserWhereInput.schema';
import { SuperUserWhereUniqueInputObjectSchema as SuperUserWhereUniqueInputObjectSchema } from './objects/SuperUserWhereUniqueInput.schema';
import { SuperUserCountAggregateInputObjectSchema as SuperUserCountAggregateInputObjectSchema } from './objects/SuperUserCountAggregateInput.schema';

export const SuperUserCountSchema: z.ZodType<Prisma.SuperUserCountArgs> = z.object({ orderBy: z.union([SuperUserOrderByWithRelationInputObjectSchema, SuperUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: SuperUserWhereInputObjectSchema.optional(), cursor: SuperUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), SuperUserCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.SuperUserCountArgs>;

export const SuperUserCountZodSchema = z.object({ orderBy: z.union([SuperUserOrderByWithRelationInputObjectSchema, SuperUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: SuperUserWhereInputObjectSchema.optional(), cursor: SuperUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), SuperUserCountAggregateInputObjectSchema ]).optional() }).strict();