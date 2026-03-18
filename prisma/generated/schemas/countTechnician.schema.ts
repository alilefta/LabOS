import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { TechnicianOrderByWithRelationInputObjectSchema as TechnicianOrderByWithRelationInputObjectSchema } from './objects/TechnicianOrderByWithRelationInput.schema';
import { TechnicianWhereInputObjectSchema as TechnicianWhereInputObjectSchema } from './objects/TechnicianWhereInput.schema';
import { TechnicianWhereUniqueInputObjectSchema as TechnicianWhereUniqueInputObjectSchema } from './objects/TechnicianWhereUniqueInput.schema';
import { TechnicianCountAggregateInputObjectSchema as TechnicianCountAggregateInputObjectSchema } from './objects/TechnicianCountAggregateInput.schema';

export const TechnicianCountSchema: z.ZodType<Prisma.TechnicianCountArgs> = z.object({ orderBy: z.union([TechnicianOrderByWithRelationInputObjectSchema, TechnicianOrderByWithRelationInputObjectSchema.array()]).optional(), where: TechnicianWhereInputObjectSchema.optional(), cursor: TechnicianWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), TechnicianCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.TechnicianCountArgs>;

export const TechnicianCountZodSchema = z.object({ orderBy: z.union([TechnicianOrderByWithRelationInputObjectSchema, TechnicianOrderByWithRelationInputObjectSchema.array()]).optional(), where: TechnicianWhereInputObjectSchema.optional(), cursor: TechnicianWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), TechnicianCountAggregateInputObjectSchema ]).optional() }).strict();