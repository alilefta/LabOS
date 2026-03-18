import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabUserWhereInputObjectSchema as LabUserWhereInputObjectSchema } from './objects/LabUserWhereInput.schema';
import { LabUserOrderByWithAggregationInputObjectSchema as LabUserOrderByWithAggregationInputObjectSchema } from './objects/LabUserOrderByWithAggregationInput.schema';
import { LabUserScalarWhereWithAggregatesInputObjectSchema as LabUserScalarWhereWithAggregatesInputObjectSchema } from './objects/LabUserScalarWhereWithAggregatesInput.schema';
import { LabUserScalarFieldEnumSchema } from './enums/LabUserScalarFieldEnum.schema';
import { LabUserCountAggregateInputObjectSchema as LabUserCountAggregateInputObjectSchema } from './objects/LabUserCountAggregateInput.schema';
import { LabUserMinAggregateInputObjectSchema as LabUserMinAggregateInputObjectSchema } from './objects/LabUserMinAggregateInput.schema';
import { LabUserMaxAggregateInputObjectSchema as LabUserMaxAggregateInputObjectSchema } from './objects/LabUserMaxAggregateInput.schema';

export const LabUserGroupBySchema: z.ZodType<Prisma.LabUserGroupByArgs> = z.object({ where: LabUserWhereInputObjectSchema.optional(), orderBy: z.union([LabUserOrderByWithAggregationInputObjectSchema, LabUserOrderByWithAggregationInputObjectSchema.array()]).optional(), having: LabUserScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(LabUserScalarFieldEnumSchema), _count: z.union([ z.literal(true), LabUserCountAggregateInputObjectSchema ]).optional(), _min: LabUserMinAggregateInputObjectSchema.optional(), _max: LabUserMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabUserGroupByArgs>;

export const LabUserGroupByZodSchema = z.object({ where: LabUserWhereInputObjectSchema.optional(), orderBy: z.union([LabUserOrderByWithAggregationInputObjectSchema, LabUserOrderByWithAggregationInputObjectSchema.array()]).optional(), having: LabUserScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(LabUserScalarFieldEnumSchema), _count: z.union([ z.literal(true), LabUserCountAggregateInputObjectSchema ]).optional(), _min: LabUserMinAggregateInputObjectSchema.optional(), _max: LabUserMaxAggregateInputObjectSchema.optional() }).strict();