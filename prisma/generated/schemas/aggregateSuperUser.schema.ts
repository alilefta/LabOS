import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SuperUserOrderByWithRelationInputObjectSchema as SuperUserOrderByWithRelationInputObjectSchema } from './objects/SuperUserOrderByWithRelationInput.schema';
import { SuperUserWhereInputObjectSchema as SuperUserWhereInputObjectSchema } from './objects/SuperUserWhereInput.schema';
import { SuperUserWhereUniqueInputObjectSchema as SuperUserWhereUniqueInputObjectSchema } from './objects/SuperUserWhereUniqueInput.schema';
import { SuperUserCountAggregateInputObjectSchema as SuperUserCountAggregateInputObjectSchema } from './objects/SuperUserCountAggregateInput.schema';
import { SuperUserMinAggregateInputObjectSchema as SuperUserMinAggregateInputObjectSchema } from './objects/SuperUserMinAggregateInput.schema';
import { SuperUserMaxAggregateInputObjectSchema as SuperUserMaxAggregateInputObjectSchema } from './objects/SuperUserMaxAggregateInput.schema';

export const SuperUserAggregateSchema: z.ZodType<Prisma.SuperUserAggregateArgs> = z.object({ orderBy: z.union([SuperUserOrderByWithRelationInputObjectSchema, SuperUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: SuperUserWhereInputObjectSchema.optional(), cursor: SuperUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), SuperUserCountAggregateInputObjectSchema ]).optional(), _min: SuperUserMinAggregateInputObjectSchema.optional(), _max: SuperUserMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.SuperUserAggregateArgs>;

export const SuperUserAggregateZodSchema = z.object({ orderBy: z.union([SuperUserOrderByWithRelationInputObjectSchema, SuperUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: SuperUserWhereInputObjectSchema.optional(), cursor: SuperUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), SuperUserCountAggregateInputObjectSchema ]).optional(), _min: SuperUserMinAggregateInputObjectSchema.optional(), _max: SuperUserMaxAggregateInputObjectSchema.optional() }).strict();