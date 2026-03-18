import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SelectedToothOrderByWithRelationInputObjectSchema as SelectedToothOrderByWithRelationInputObjectSchema } from './objects/SelectedToothOrderByWithRelationInput.schema';
import { SelectedToothWhereInputObjectSchema as SelectedToothWhereInputObjectSchema } from './objects/SelectedToothWhereInput.schema';
import { SelectedToothWhereUniqueInputObjectSchema as SelectedToothWhereUniqueInputObjectSchema } from './objects/SelectedToothWhereUniqueInput.schema';
import { SelectedToothCountAggregateInputObjectSchema as SelectedToothCountAggregateInputObjectSchema } from './objects/SelectedToothCountAggregateInput.schema';

export const SelectedToothCountSchema: z.ZodType<Prisma.SelectedToothCountArgs> = z.object({ orderBy: z.union([SelectedToothOrderByWithRelationInputObjectSchema, SelectedToothOrderByWithRelationInputObjectSchema.array()]).optional(), where: SelectedToothWhereInputObjectSchema.optional(), cursor: SelectedToothWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), SelectedToothCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.SelectedToothCountArgs>;

export const SelectedToothCountZodSchema = z.object({ orderBy: z.union([SelectedToothOrderByWithRelationInputObjectSchema, SelectedToothOrderByWithRelationInputObjectSchema.array()]).optional(), where: SelectedToothWhereInputObjectSchema.optional(), cursor: SelectedToothWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), SelectedToothCountAggregateInputObjectSchema ]).optional() }).strict();