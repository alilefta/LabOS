import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { WorkTypeOrderByWithRelationInputObjectSchema as WorkTypeOrderByWithRelationInputObjectSchema } from './objects/WorkTypeOrderByWithRelationInput.schema';
import { WorkTypeWhereInputObjectSchema as WorkTypeWhereInputObjectSchema } from './objects/WorkTypeWhereInput.schema';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './objects/WorkTypeWhereUniqueInput.schema';
import { WorkTypeCountAggregateInputObjectSchema as WorkTypeCountAggregateInputObjectSchema } from './objects/WorkTypeCountAggregateInput.schema';
import { WorkTypeMinAggregateInputObjectSchema as WorkTypeMinAggregateInputObjectSchema } from './objects/WorkTypeMinAggregateInput.schema';
import { WorkTypeMaxAggregateInputObjectSchema as WorkTypeMaxAggregateInputObjectSchema } from './objects/WorkTypeMaxAggregateInput.schema';

export const WorkTypeAggregateSchema: z.ZodType<Prisma.WorkTypeAggregateArgs> = z.object({ orderBy: z.union([WorkTypeOrderByWithRelationInputObjectSchema, WorkTypeOrderByWithRelationInputObjectSchema.array()]).optional(), where: WorkTypeWhereInputObjectSchema.optional(), cursor: WorkTypeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), WorkTypeCountAggregateInputObjectSchema ]).optional(), _min: WorkTypeMinAggregateInputObjectSchema.optional(), _max: WorkTypeMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.WorkTypeAggregateArgs>;

export const WorkTypeAggregateZodSchema = z.object({ orderBy: z.union([WorkTypeOrderByWithRelationInputObjectSchema, WorkTypeOrderByWithRelationInputObjectSchema.array()]).optional(), where: WorkTypeWhereInputObjectSchema.optional(), cursor: WorkTypeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), WorkTypeCountAggregateInputObjectSchema ]).optional(), _min: WorkTypeMinAggregateInputObjectSchema.optional(), _max: WorkTypeMaxAggregateInputObjectSchema.optional() }).strict();