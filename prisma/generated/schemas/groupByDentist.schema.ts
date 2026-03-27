import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { DentistWhereInputObjectSchema as DentistWhereInputObjectSchema } from './objects/DentistWhereInput.schema';
import { DentistOrderByWithAggregationInputObjectSchema as DentistOrderByWithAggregationInputObjectSchema } from './objects/DentistOrderByWithAggregationInput.schema';
import { DentistScalarWhereWithAggregatesInputObjectSchema as DentistScalarWhereWithAggregatesInputObjectSchema } from './objects/DentistScalarWhereWithAggregatesInput.schema';
import { DentistScalarFieldEnumSchema } from './enums/DentistScalarFieldEnum.schema';
import { DentistCountAggregateInputObjectSchema as DentistCountAggregateInputObjectSchema } from './objects/DentistCountAggregateInput.schema';
import { DentistMinAggregateInputObjectSchema as DentistMinAggregateInputObjectSchema } from './objects/DentistMinAggregateInput.schema';
import { DentistMaxAggregateInputObjectSchema as DentistMaxAggregateInputObjectSchema } from './objects/DentistMaxAggregateInput.schema';

export const DentistGroupBySchema: z.ZodType<Prisma.DentistGroupByArgs> = z.object({ where: DentistWhereInputObjectSchema.optional(), orderBy: z.union([DentistOrderByWithAggregationInputObjectSchema, DentistOrderByWithAggregationInputObjectSchema.array()]).optional(), having: DentistScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(DentistScalarFieldEnumSchema), _count: z.union([ z.literal(true), DentistCountAggregateInputObjectSchema ]).optional(), _min: DentistMinAggregateInputObjectSchema.optional(), _max: DentistMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.DentistGroupByArgs>;

export const DentistGroupByZodSchema = z.object({ where: DentistWhereInputObjectSchema.optional(), orderBy: z.union([DentistOrderByWithAggregationInputObjectSchema, DentistOrderByWithAggregationInputObjectSchema.array()]).optional(), having: DentistScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(DentistScalarFieldEnumSchema), _count: z.union([ z.literal(true), DentistCountAggregateInputObjectSchema ]).optional(), _min: DentistMinAggregateInputObjectSchema.optional(), _max: DentistMaxAggregateInputObjectSchema.optional() }).strict();