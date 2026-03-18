import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './objects/ClinicWhereInput.schema';
import { ClinicOrderByWithAggregationInputObjectSchema as ClinicOrderByWithAggregationInputObjectSchema } from './objects/ClinicOrderByWithAggregationInput.schema';
import { ClinicScalarWhereWithAggregatesInputObjectSchema as ClinicScalarWhereWithAggregatesInputObjectSchema } from './objects/ClinicScalarWhereWithAggregatesInput.schema';
import { ClinicScalarFieldEnumSchema } from './enums/ClinicScalarFieldEnum.schema';
import { ClinicCountAggregateInputObjectSchema as ClinicCountAggregateInputObjectSchema } from './objects/ClinicCountAggregateInput.schema';
import { ClinicMinAggregateInputObjectSchema as ClinicMinAggregateInputObjectSchema } from './objects/ClinicMinAggregateInput.schema';
import { ClinicMaxAggregateInputObjectSchema as ClinicMaxAggregateInputObjectSchema } from './objects/ClinicMaxAggregateInput.schema';

export const ClinicGroupBySchema: z.ZodType<Prisma.ClinicGroupByArgs> = z.object({ where: ClinicWhereInputObjectSchema.optional(), orderBy: z.union([ClinicOrderByWithAggregationInputObjectSchema, ClinicOrderByWithAggregationInputObjectSchema.array()]).optional(), having: ClinicScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(ClinicScalarFieldEnumSchema), _count: z.union([ z.literal(true), ClinicCountAggregateInputObjectSchema ]).optional(), _min: ClinicMinAggregateInputObjectSchema.optional(), _max: ClinicMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ClinicGroupByArgs>;

export const ClinicGroupByZodSchema = z.object({ where: ClinicWhereInputObjectSchema.optional(), orderBy: z.union([ClinicOrderByWithAggregationInputObjectSchema, ClinicOrderByWithAggregationInputObjectSchema.array()]).optional(), having: ClinicScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(ClinicScalarFieldEnumSchema), _count: z.union([ z.literal(true), ClinicCountAggregateInputObjectSchema ]).optional(), _min: ClinicMinAggregateInputObjectSchema.optional(), _max: ClinicMaxAggregateInputObjectSchema.optional() }).strict();