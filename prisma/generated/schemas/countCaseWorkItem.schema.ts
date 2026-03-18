import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWorkItemOrderByWithRelationInputObjectSchema as CaseWorkItemOrderByWithRelationInputObjectSchema } from './objects/CaseWorkItemOrderByWithRelationInput.schema';
import { CaseWorkItemWhereInputObjectSchema as CaseWorkItemWhereInputObjectSchema } from './objects/CaseWorkItemWhereInput.schema';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './objects/CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemCountAggregateInputObjectSchema as CaseWorkItemCountAggregateInputObjectSchema } from './objects/CaseWorkItemCountAggregateInput.schema';

export const CaseWorkItemCountSchema: z.ZodType<Prisma.CaseWorkItemCountArgs> = z.object({ orderBy: z.union([CaseWorkItemOrderByWithRelationInputObjectSchema, CaseWorkItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseWorkItemWhereInputObjectSchema.optional(), cursor: CaseWorkItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CaseWorkItemCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemCountArgs>;

export const CaseWorkItemCountZodSchema = z.object({ orderBy: z.union([CaseWorkItemOrderByWithRelationInputObjectSchema, CaseWorkItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseWorkItemWhereInputObjectSchema.optional(), cursor: CaseWorkItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CaseWorkItemCountAggregateInputObjectSchema ]).optional() }).strict();