import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { DentistOrderByWithRelationInputObjectSchema as DentistOrderByWithRelationInputObjectSchema } from './objects/DentistOrderByWithRelationInput.schema';
import { DentistWhereInputObjectSchema as DentistWhereInputObjectSchema } from './objects/DentistWhereInput.schema';
import { DentistWhereUniqueInputObjectSchema as DentistWhereUniqueInputObjectSchema } from './objects/DentistWhereUniqueInput.schema';
import { DentistCountAggregateInputObjectSchema as DentistCountAggregateInputObjectSchema } from './objects/DentistCountAggregateInput.schema';
import { DentistMinAggregateInputObjectSchema as DentistMinAggregateInputObjectSchema } from './objects/DentistMinAggregateInput.schema';
import { DentistMaxAggregateInputObjectSchema as DentistMaxAggregateInputObjectSchema } from './objects/DentistMaxAggregateInput.schema';

export const DentistAggregateSchema: z.ZodType<Prisma.DentistAggregateArgs> = z.object({ orderBy: z.union([DentistOrderByWithRelationInputObjectSchema, DentistOrderByWithRelationInputObjectSchema.array()]).optional(), where: DentistWhereInputObjectSchema.optional(), cursor: DentistWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), DentistCountAggregateInputObjectSchema ]).optional(), _min: DentistMinAggregateInputObjectSchema.optional(), _max: DentistMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.DentistAggregateArgs>;

export const DentistAggregateZodSchema = z.object({ orderBy: z.union([DentistOrderByWithRelationInputObjectSchema, DentistOrderByWithRelationInputObjectSchema.array()]).optional(), where: DentistWhereInputObjectSchema.optional(), cursor: DentistWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), DentistCountAggregateInputObjectSchema ]).optional(), _min: DentistMinAggregateInputObjectSchema.optional(), _max: DentistMaxAggregateInputObjectSchema.optional() }).strict();