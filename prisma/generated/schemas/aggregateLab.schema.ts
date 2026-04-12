import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './objects/LabOrderByWithRelationInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './objects/LabWhereInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './objects/LabWhereUniqueInput.schema';
import { LabCountAggregateInputObjectSchema as LabCountAggregateInputObjectSchema } from './objects/LabCountAggregateInput.schema';
import { LabMinAggregateInputObjectSchema as LabMinAggregateInputObjectSchema } from './objects/LabMinAggregateInput.schema';
import { LabMaxAggregateInputObjectSchema as LabMaxAggregateInputObjectSchema } from './objects/LabMaxAggregateInput.schema';
import { LabAvgAggregateInputObjectSchema as LabAvgAggregateInputObjectSchema } from './objects/LabAvgAggregateInput.schema';
import { LabSumAggregateInputObjectSchema as LabSumAggregateInputObjectSchema } from './objects/LabSumAggregateInput.schema';

export const LabAggregateSchema: z.ZodType<Prisma.LabAggregateArgs> = z.object({ orderBy: z.union([LabOrderByWithRelationInputObjectSchema, LabOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabWhereInputObjectSchema.optional(), cursor: LabWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), LabCountAggregateInputObjectSchema ]).optional(), _min: LabMinAggregateInputObjectSchema.optional(), _max: LabMaxAggregateInputObjectSchema.optional(), _avg: LabAvgAggregateInputObjectSchema.optional(), _sum: LabSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabAggregateArgs>;

export const LabAggregateZodSchema = z.object({ orderBy: z.union([LabOrderByWithRelationInputObjectSchema, LabOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabWhereInputObjectSchema.optional(), cursor: LabWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), LabCountAggregateInputObjectSchema ]).optional(), _min: LabMinAggregateInputObjectSchema.optional(), _max: LabMaxAggregateInputObjectSchema.optional(), _avg: LabAvgAggregateInputObjectSchema.optional(), _sum: LabSumAggregateInputObjectSchema.optional() }).strict();