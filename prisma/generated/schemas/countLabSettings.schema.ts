import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSettingsOrderByWithRelationInputObjectSchema as LabSettingsOrderByWithRelationInputObjectSchema } from './objects/LabSettingsOrderByWithRelationInput.schema';
import { LabSettingsWhereInputObjectSchema as LabSettingsWhereInputObjectSchema } from './objects/LabSettingsWhereInput.schema';
import { LabSettingsWhereUniqueInputObjectSchema as LabSettingsWhereUniqueInputObjectSchema } from './objects/LabSettingsWhereUniqueInput.schema';
import { LabSettingsCountAggregateInputObjectSchema as LabSettingsCountAggregateInputObjectSchema } from './objects/LabSettingsCountAggregateInput.schema';

export const LabSettingsCountSchema: z.ZodType<Prisma.LabSettingsCountArgs> = z.object({ orderBy: z.union([LabSettingsOrderByWithRelationInputObjectSchema, LabSettingsOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabSettingsWhereInputObjectSchema.optional(), cursor: LabSettingsWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), LabSettingsCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.LabSettingsCountArgs>;

export const LabSettingsCountZodSchema = z.object({ orderBy: z.union([LabSettingsOrderByWithRelationInputObjectSchema, LabSettingsOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabSettingsWhereInputObjectSchema.optional(), cursor: LabSettingsWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), LabSettingsCountAggregateInputObjectSchema ]).optional() }).strict();