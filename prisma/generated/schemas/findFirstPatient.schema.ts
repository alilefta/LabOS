import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { PatientIncludeObjectSchema as PatientIncludeObjectSchema } from './objects/PatientInclude.schema';
import { PatientOrderByWithRelationInputObjectSchema as PatientOrderByWithRelationInputObjectSchema } from './objects/PatientOrderByWithRelationInput.schema';
import { PatientWhereInputObjectSchema as PatientWhereInputObjectSchema } from './objects/PatientWhereInput.schema';
import { PatientWhereUniqueInputObjectSchema as PatientWhereUniqueInputObjectSchema } from './objects/PatientWhereUniqueInput.schema';
import { PatientScalarFieldEnumSchema } from './enums/PatientScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PatientFindFirstSelectSchema: z.ZodType<Prisma.PatientSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    notes: z.boolean().optional(),
    age: z.boolean().optional(),
    gender: z.boolean().optional(),
    cases: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PatientSelect>;

export const PatientFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    notes: z.boolean().optional(),
    age: z.boolean().optional(),
    gender: z.boolean().optional(),
    cases: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const PatientFindFirstSchema: z.ZodType<Prisma.PatientFindFirstArgs> = z.object({ select: PatientFindFirstSelectSchema.optional(), include: z.lazy(() => PatientIncludeObjectSchema.optional()), orderBy: z.union([PatientOrderByWithRelationInputObjectSchema, PatientOrderByWithRelationInputObjectSchema.array()]).optional(), where: PatientWhereInputObjectSchema.optional(), cursor: PatientWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PatientScalarFieldEnumSchema, PatientScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PatientFindFirstArgs>;

export const PatientFindFirstZodSchema = z.object({ select: PatientFindFirstSelectSchema.optional(), include: z.lazy(() => PatientIncludeObjectSchema.optional()), orderBy: z.union([PatientOrderByWithRelationInputObjectSchema, PatientOrderByWithRelationInputObjectSchema.array()]).optional(), where: PatientWhereInputObjectSchema.optional(), cursor: PatientWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PatientScalarFieldEnumSchema, PatientScalarFieldEnumSchema.array()]).optional() }).strict();