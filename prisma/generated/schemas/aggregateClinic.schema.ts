import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ClinicOrderByWithRelationInputObjectSchema as ClinicOrderByWithRelationInputObjectSchema } from './objects/ClinicOrderByWithRelationInput.schema';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './objects/ClinicWhereInput.schema';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './objects/ClinicWhereUniqueInput.schema';
import { ClinicCountAggregateInputObjectSchema as ClinicCountAggregateInputObjectSchema } from './objects/ClinicCountAggregateInput.schema';
import { ClinicMinAggregateInputObjectSchema as ClinicMinAggregateInputObjectSchema } from './objects/ClinicMinAggregateInput.schema';
import { ClinicMaxAggregateInputObjectSchema as ClinicMaxAggregateInputObjectSchema } from './objects/ClinicMaxAggregateInput.schema';

export const ClinicAggregateSchema: z.ZodType<Prisma.ClinicAggregateArgs> = z.object({ orderBy: z.union([ClinicOrderByWithRelationInputObjectSchema, ClinicOrderByWithRelationInputObjectSchema.array()]).optional(), where: ClinicWhereInputObjectSchema.optional(), cursor: ClinicWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), ClinicCountAggregateInputObjectSchema ]).optional(), _min: ClinicMinAggregateInputObjectSchema.optional(), _max: ClinicMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ClinicAggregateArgs>;

export const ClinicAggregateZodSchema = z.object({ orderBy: z.union([ClinicOrderByWithRelationInputObjectSchema, ClinicOrderByWithRelationInputObjectSchema.array()]).optional(), where: ClinicWhereInputObjectSchema.optional(), cursor: ClinicWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), ClinicCountAggregateInputObjectSchema ]).optional(), _min: ClinicMinAggregateInputObjectSchema.optional(), _max: ClinicMaxAggregateInputObjectSchema.optional() }).strict();