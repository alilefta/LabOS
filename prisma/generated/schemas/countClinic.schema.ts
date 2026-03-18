import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ClinicOrderByWithRelationInputObjectSchema as ClinicOrderByWithRelationInputObjectSchema } from './objects/ClinicOrderByWithRelationInput.schema';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './objects/ClinicWhereInput.schema';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './objects/ClinicWhereUniqueInput.schema';
import { ClinicCountAggregateInputObjectSchema as ClinicCountAggregateInputObjectSchema } from './objects/ClinicCountAggregateInput.schema';

export const ClinicCountSchema: z.ZodType<Prisma.ClinicCountArgs> = z.object({ orderBy: z.union([ClinicOrderByWithRelationInputObjectSchema, ClinicOrderByWithRelationInputObjectSchema.array()]).optional(), where: ClinicWhereInputObjectSchema.optional(), cursor: ClinicWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ClinicCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ClinicCountArgs>;

export const ClinicCountZodSchema = z.object({ orderBy: z.union([ClinicOrderByWithRelationInputObjectSchema, ClinicOrderByWithRelationInputObjectSchema.array()]).optional(), where: ClinicWhereInputObjectSchema.optional(), cursor: ClinicWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ClinicCountAggregateInputObjectSchema ]).optional() }).strict();