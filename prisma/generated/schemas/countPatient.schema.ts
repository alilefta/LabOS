import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { PatientOrderByWithRelationInputObjectSchema as PatientOrderByWithRelationInputObjectSchema } from './objects/PatientOrderByWithRelationInput.schema';
import { PatientWhereInputObjectSchema as PatientWhereInputObjectSchema } from './objects/PatientWhereInput.schema';
import { PatientWhereUniqueInputObjectSchema as PatientWhereUniqueInputObjectSchema } from './objects/PatientWhereUniqueInput.schema';
import { PatientCountAggregateInputObjectSchema as PatientCountAggregateInputObjectSchema } from './objects/PatientCountAggregateInput.schema';

export const PatientCountSchema: z.ZodType<Prisma.PatientCountArgs> = z.object({ orderBy: z.union([PatientOrderByWithRelationInputObjectSchema, PatientOrderByWithRelationInputObjectSchema.array()]).optional(), where: PatientWhereInputObjectSchema.optional(), cursor: PatientWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PatientCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.PatientCountArgs>;

export const PatientCountZodSchema = z.object({ orderBy: z.union([PatientOrderByWithRelationInputObjectSchema, PatientOrderByWithRelationInputObjectSchema.array()]).optional(), where: PatientWhereInputObjectSchema.optional(), cursor: PatientWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PatientCountAggregateInputObjectSchema ]).optional() }).strict();