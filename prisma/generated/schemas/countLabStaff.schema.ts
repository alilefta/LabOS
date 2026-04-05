import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabStaffOrderByWithRelationInputObjectSchema as LabStaffOrderByWithRelationInputObjectSchema } from './objects/LabStaffOrderByWithRelationInput.schema';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './objects/LabStaffWhereInput.schema';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './objects/LabStaffWhereUniqueInput.schema';
import { LabStaffCountAggregateInputObjectSchema as LabStaffCountAggregateInputObjectSchema } from './objects/LabStaffCountAggregateInput.schema';

export const LabStaffCountSchema: z.ZodType<Prisma.LabStaffCountArgs> = z.object({ orderBy: z.union([LabStaffOrderByWithRelationInputObjectSchema, LabStaffOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabStaffWhereInputObjectSchema.optional(), cursor: LabStaffWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), LabStaffCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.LabStaffCountArgs>;

export const LabStaffCountZodSchema = z.object({ orderBy: z.union([LabStaffOrderByWithRelationInputObjectSchema, LabStaffOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabStaffWhereInputObjectSchema.optional(), cursor: LabStaffWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), LabStaffCountAggregateInputObjectSchema ]).optional() }).strict();