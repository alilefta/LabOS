import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { DentistOrderByWithRelationInputObjectSchema as DentistOrderByWithRelationInputObjectSchema } from './objects/DentistOrderByWithRelationInput.schema';
import { DentistWhereInputObjectSchema as DentistWhereInputObjectSchema } from './objects/DentistWhereInput.schema';
import { DentistWhereUniqueInputObjectSchema as DentistWhereUniqueInputObjectSchema } from './objects/DentistWhereUniqueInput.schema';
import { DentistCountAggregateInputObjectSchema as DentistCountAggregateInputObjectSchema } from './objects/DentistCountAggregateInput.schema';

export const DentistCountSchema: z.ZodType<Prisma.DentistCountArgs> = z.object({ orderBy: z.union([DentistOrderByWithRelationInputObjectSchema, DentistOrderByWithRelationInputObjectSchema.array()]).optional(), where: DentistWhereInputObjectSchema.optional(), cursor: DentistWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), DentistCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.DentistCountArgs>;

export const DentistCountZodSchema = z.object({ orderBy: z.union([DentistOrderByWithRelationInputObjectSchema, DentistOrderByWithRelationInputObjectSchema.array()]).optional(), where: DentistWhereInputObjectSchema.optional(), cursor: DentistWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), DentistCountAggregateInputObjectSchema ]).optional() }).strict();