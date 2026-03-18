import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { WorkTypeOrderByWithRelationInputObjectSchema as WorkTypeOrderByWithRelationInputObjectSchema } from './objects/WorkTypeOrderByWithRelationInput.schema';
import { WorkTypeWhereInputObjectSchema as WorkTypeWhereInputObjectSchema } from './objects/WorkTypeWhereInput.schema';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './objects/WorkTypeWhereUniqueInput.schema';
import { WorkTypeCountAggregateInputObjectSchema as WorkTypeCountAggregateInputObjectSchema } from './objects/WorkTypeCountAggregateInput.schema';

export const WorkTypeCountSchema: z.ZodType<Prisma.WorkTypeCountArgs> = z.object({ orderBy: z.union([WorkTypeOrderByWithRelationInputObjectSchema, WorkTypeOrderByWithRelationInputObjectSchema.array()]).optional(), where: WorkTypeWhereInputObjectSchema.optional(), cursor: WorkTypeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), WorkTypeCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.WorkTypeCountArgs>;

export const WorkTypeCountZodSchema = z.object({ orderBy: z.union([WorkTypeOrderByWithRelationInputObjectSchema, WorkTypeOrderByWithRelationInputObjectSchema.array()]).optional(), where: WorkTypeWhereInputObjectSchema.optional(), cursor: WorkTypeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), WorkTypeCountAggregateInputObjectSchema ]).optional() }).strict();