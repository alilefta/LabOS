import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabUserOrderByWithRelationInputObjectSchema as LabUserOrderByWithRelationInputObjectSchema } from './objects/LabUserOrderByWithRelationInput.schema';
import { LabUserWhereInputObjectSchema as LabUserWhereInputObjectSchema } from './objects/LabUserWhereInput.schema';
import { LabUserWhereUniqueInputObjectSchema as LabUserWhereUniqueInputObjectSchema } from './objects/LabUserWhereUniqueInput.schema';
import { LabUserCountAggregateInputObjectSchema as LabUserCountAggregateInputObjectSchema } from './objects/LabUserCountAggregateInput.schema';
import { LabUserMinAggregateInputObjectSchema as LabUserMinAggregateInputObjectSchema } from './objects/LabUserMinAggregateInput.schema';
import { LabUserMaxAggregateInputObjectSchema as LabUserMaxAggregateInputObjectSchema } from './objects/LabUserMaxAggregateInput.schema';

export const LabUserAggregateSchema: z.ZodType<Prisma.LabUserAggregateArgs> = z.object({ orderBy: z.union([LabUserOrderByWithRelationInputObjectSchema, LabUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabUserWhereInputObjectSchema.optional(), cursor: LabUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), LabUserCountAggregateInputObjectSchema ]).optional(), _min: LabUserMinAggregateInputObjectSchema.optional(), _max: LabUserMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabUserAggregateArgs>;

export const LabUserAggregateZodSchema = z.object({ orderBy: z.union([LabUserOrderByWithRelationInputObjectSchema, LabUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabUserWhereInputObjectSchema.optional(), cursor: LabUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), LabUserCountAggregateInputObjectSchema ]).optional(), _min: LabUserMinAggregateInputObjectSchema.optional(), _max: LabUserMaxAggregateInputObjectSchema.optional() }).strict();