import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './objects/LabOrderByWithRelationInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './objects/LabWhereInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './objects/LabWhereUniqueInput.schema';
import { LabCountAggregateInputObjectSchema as LabCountAggregateInputObjectSchema } from './objects/LabCountAggregateInput.schema';

export const LabCountSchema: z.ZodType<Prisma.LabCountArgs> = z.object({ orderBy: z.union([LabOrderByWithRelationInputObjectSchema, LabOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabWhereInputObjectSchema.optional(), cursor: LabWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), LabCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.LabCountArgs>;

export const LabCountZodSchema = z.object({ orderBy: z.union([LabOrderByWithRelationInputObjectSchema, LabOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabWhereInputObjectSchema.optional(), cursor: LabWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), LabCountAggregateInputObjectSchema ]).optional() }).strict();