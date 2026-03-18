import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './objects/LabWhereInput.schema';
import { LabOrderByWithAggregationInputObjectSchema as LabOrderByWithAggregationInputObjectSchema } from './objects/LabOrderByWithAggregationInput.schema';
import { LabScalarWhereWithAggregatesInputObjectSchema as LabScalarWhereWithAggregatesInputObjectSchema } from './objects/LabScalarWhereWithAggregatesInput.schema';
import { LabScalarFieldEnumSchema } from './enums/LabScalarFieldEnum.schema';
import { LabCountAggregateInputObjectSchema as LabCountAggregateInputObjectSchema } from './objects/LabCountAggregateInput.schema';
import { LabMinAggregateInputObjectSchema as LabMinAggregateInputObjectSchema } from './objects/LabMinAggregateInput.schema';
import { LabMaxAggregateInputObjectSchema as LabMaxAggregateInputObjectSchema } from './objects/LabMaxAggregateInput.schema';

export const LabGroupBySchema: z.ZodType<Prisma.LabGroupByArgs> = z.object({ where: LabWhereInputObjectSchema.optional(), orderBy: z.union([LabOrderByWithAggregationInputObjectSchema, LabOrderByWithAggregationInputObjectSchema.array()]).optional(), having: LabScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(LabScalarFieldEnumSchema), _count: z.union([ z.literal(true), LabCountAggregateInputObjectSchema ]).optional(), _min: LabMinAggregateInputObjectSchema.optional(), _max: LabMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabGroupByArgs>;

export const LabGroupByZodSchema = z.object({ where: LabWhereInputObjectSchema.optional(), orderBy: z.union([LabOrderByWithAggregationInputObjectSchema, LabOrderByWithAggregationInputObjectSchema.array()]).optional(), having: LabScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(LabScalarFieldEnumSchema), _count: z.union([ z.literal(true), LabCountAggregateInputObjectSchema ]).optional(), _min: LabMinAggregateInputObjectSchema.optional(), _max: LabMaxAggregateInputObjectSchema.optional() }).strict();