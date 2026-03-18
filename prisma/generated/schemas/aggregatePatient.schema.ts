import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { PatientOrderByWithRelationInputObjectSchema as PatientOrderByWithRelationInputObjectSchema } from './objects/PatientOrderByWithRelationInput.schema';
import { PatientWhereInputObjectSchema as PatientWhereInputObjectSchema } from './objects/PatientWhereInput.schema';
import { PatientWhereUniqueInputObjectSchema as PatientWhereUniqueInputObjectSchema } from './objects/PatientWhereUniqueInput.schema';
import { PatientCountAggregateInputObjectSchema as PatientCountAggregateInputObjectSchema } from './objects/PatientCountAggregateInput.schema';
import { PatientMinAggregateInputObjectSchema as PatientMinAggregateInputObjectSchema } from './objects/PatientMinAggregateInput.schema';
import { PatientMaxAggregateInputObjectSchema as PatientMaxAggregateInputObjectSchema } from './objects/PatientMaxAggregateInput.schema';

export const PatientAggregateSchema: z.ZodType<Prisma.PatientAggregateArgs> = z.object({ orderBy: z.union([PatientOrderByWithRelationInputObjectSchema, PatientOrderByWithRelationInputObjectSchema.array()]).optional(), where: PatientWhereInputObjectSchema.optional(), cursor: PatientWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), PatientCountAggregateInputObjectSchema ]).optional(), _min: PatientMinAggregateInputObjectSchema.optional(), _max: PatientMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PatientAggregateArgs>;

export const PatientAggregateZodSchema = z.object({ orderBy: z.union([PatientOrderByWithRelationInputObjectSchema, PatientOrderByWithRelationInputObjectSchema.array()]).optional(), where: PatientWhereInputObjectSchema.optional(), cursor: PatientWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), PatientCountAggregateInputObjectSchema ]).optional(), _min: PatientMinAggregateInputObjectSchema.optional(), _max: PatientMaxAggregateInputObjectSchema.optional() }).strict();