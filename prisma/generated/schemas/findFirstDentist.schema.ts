import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { DentistIncludeObjectSchema as DentistIncludeObjectSchema } from './objects/DentistInclude.schema';
import { DentistOrderByWithRelationInputObjectSchema as DentistOrderByWithRelationInputObjectSchema } from './objects/DentistOrderByWithRelationInput.schema';
import { DentistWhereInputObjectSchema as DentistWhereInputObjectSchema } from './objects/DentistWhereInput.schema';
import { DentistWhereUniqueInputObjectSchema as DentistWhereUniqueInputObjectSchema } from './objects/DentistWhereUniqueInput.schema';
import { DentistScalarFieldEnumSchema } from './enums/DentistScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const DentistFindFirstSelectSchema: z.ZodType<Prisma.DentistSelect> = z.object({
    id: z.boolean().optional(),
    clinicId: z.boolean().optional(),
    clinic: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    name: z.boolean().optional(),
    email: z.boolean().optional(),
    phoneNumber: z.boolean().optional(),
    isOwner: z.boolean().optional(),
    isDefault: z.boolean().optional(),
    notes: z.boolean().optional(),
    cases: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.DentistSelect>;

export const DentistFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    clinicId: z.boolean().optional(),
    clinic: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    name: z.boolean().optional(),
    email: z.boolean().optional(),
    phoneNumber: z.boolean().optional(),
    isOwner: z.boolean().optional(),
    isDefault: z.boolean().optional(),
    notes: z.boolean().optional(),
    cases: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const DentistFindFirstSchema: z.ZodType<Prisma.DentistFindFirstArgs> = z.object({ select: DentistFindFirstSelectSchema.optional(), include: z.lazy(() => DentistIncludeObjectSchema.optional()), orderBy: z.union([DentistOrderByWithRelationInputObjectSchema, DentistOrderByWithRelationInputObjectSchema.array()]).optional(), where: DentistWhereInputObjectSchema.optional(), cursor: DentistWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([DentistScalarFieldEnumSchema, DentistScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.DentistFindFirstArgs>;

export const DentistFindFirstZodSchema = z.object({ select: DentistFindFirstSelectSchema.optional(), include: z.lazy(() => DentistIncludeObjectSchema.optional()), orderBy: z.union([DentistOrderByWithRelationInputObjectSchema, DentistOrderByWithRelationInputObjectSchema.array()]).optional(), where: DentistWhereInputObjectSchema.optional(), cursor: DentistWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([DentistScalarFieldEnumSchema, DentistScalarFieldEnumSchema.array()]).optional() }).strict();