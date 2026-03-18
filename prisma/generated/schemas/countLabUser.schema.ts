import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabUserOrderByWithRelationInputObjectSchema as LabUserOrderByWithRelationInputObjectSchema } from './objects/LabUserOrderByWithRelationInput.schema';
import { LabUserWhereInputObjectSchema as LabUserWhereInputObjectSchema } from './objects/LabUserWhereInput.schema';
import { LabUserWhereUniqueInputObjectSchema as LabUserWhereUniqueInputObjectSchema } from './objects/LabUserWhereUniqueInput.schema';
import { LabUserCountAggregateInputObjectSchema as LabUserCountAggregateInputObjectSchema } from './objects/LabUserCountAggregateInput.schema';

export const LabUserCountSchema: z.ZodType<Prisma.LabUserCountArgs> = z.object({ orderBy: z.union([LabUserOrderByWithRelationInputObjectSchema, LabUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabUserWhereInputObjectSchema.optional(), cursor: LabUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), LabUserCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.LabUserCountArgs>;

export const LabUserCountZodSchema = z.object({ orderBy: z.union([LabUserOrderByWithRelationInputObjectSchema, LabUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabUserWhereInputObjectSchema.optional(), cursor: LabUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), LabUserCountAggregateInputObjectSchema ]).optional() }).strict();