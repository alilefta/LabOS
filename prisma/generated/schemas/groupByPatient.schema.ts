import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { PatientWhereInputObjectSchema as PatientWhereInputObjectSchema } from './objects/PatientWhereInput.schema';
import { PatientOrderByWithAggregationInputObjectSchema as PatientOrderByWithAggregationInputObjectSchema } from './objects/PatientOrderByWithAggregationInput.schema';
import { PatientScalarWhereWithAggregatesInputObjectSchema as PatientScalarWhereWithAggregatesInputObjectSchema } from './objects/PatientScalarWhereWithAggregatesInput.schema';
import { PatientScalarFieldEnumSchema } from './enums/PatientScalarFieldEnum.schema';
import { PatientCountAggregateInputObjectSchema as PatientCountAggregateInputObjectSchema } from './objects/PatientCountAggregateInput.schema';
import { PatientMinAggregateInputObjectSchema as PatientMinAggregateInputObjectSchema } from './objects/PatientMinAggregateInput.schema';
import { PatientMaxAggregateInputObjectSchema as PatientMaxAggregateInputObjectSchema } from './objects/PatientMaxAggregateInput.schema';

export const PatientGroupBySchema: z.ZodType<Prisma.PatientGroupByArgs> = z.object({ where: PatientWhereInputObjectSchema.optional(), orderBy: z.union([PatientOrderByWithAggregationInputObjectSchema, PatientOrderByWithAggregationInputObjectSchema.array()]).optional(), having: PatientScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(PatientScalarFieldEnumSchema), _count: z.union([ z.literal(true), PatientCountAggregateInputObjectSchema ]).optional(), _min: PatientMinAggregateInputObjectSchema.optional(), _max: PatientMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PatientGroupByArgs>;

export const PatientGroupByZodSchema = z.object({ where: PatientWhereInputObjectSchema.optional(), orderBy: z.union([PatientOrderByWithAggregationInputObjectSchema, PatientOrderByWithAggregationInputObjectSchema.array()]).optional(), having: PatientScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(PatientScalarFieldEnumSchema), _count: z.union([ z.literal(true), PatientCountAggregateInputObjectSchema ]).optional(), _min: PatientMinAggregateInputObjectSchema.optional(), _max: PatientMaxAggregateInputObjectSchema.optional() }).strict();