import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabStaffIncludeObjectSchema as LabStaffIncludeObjectSchema } from './objects/LabStaffInclude.schema';
import { LabStaffOrderByWithRelationInputObjectSchema as LabStaffOrderByWithRelationInputObjectSchema } from './objects/LabStaffOrderByWithRelationInput.schema';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './objects/LabStaffWhereInput.schema';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './objects/LabStaffWhereUniqueInput.schema';
import { LabStaffScalarFieldEnumSchema } from './enums/LabStaffScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const LabStaffFindFirstOrThrowSelectSchema: z.ZodType<Prisma.LabStaffSelect> = z.object({
    id: z.boolean().optional(),
    firstName: z.boolean().optional(),
    lastName: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    email: z.boolean().optional(),
    phoneNumber: z.boolean().optional(),
    avatarUrl: z.boolean().optional(),
    isActive: z.boolean().optional(),
    roleCategory: z.boolean().optional(),
    jobTitle: z.boolean().optional(),
    specialization: z.boolean().optional(),
    commissionType: z.boolean().optional(),
    commissionValue: z.boolean().optional(),
    cases: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.LabStaffSelect>;

export const LabStaffFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    firstName: z.boolean().optional(),
    lastName: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    email: z.boolean().optional(),
    phoneNumber: z.boolean().optional(),
    avatarUrl: z.boolean().optional(),
    isActive: z.boolean().optional(),
    roleCategory: z.boolean().optional(),
    jobTitle: z.boolean().optional(),
    specialization: z.boolean().optional(),
    commissionType: z.boolean().optional(),
    commissionValue: z.boolean().optional(),
    cases: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const LabStaffFindFirstOrThrowSchema: z.ZodType<Prisma.LabStaffFindFirstOrThrowArgs> = z.object({ select: LabStaffFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => LabStaffIncludeObjectSchema.optional()), orderBy: z.union([LabStaffOrderByWithRelationInputObjectSchema, LabStaffOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabStaffWhereInputObjectSchema.optional(), cursor: LabStaffWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([LabStaffScalarFieldEnumSchema, LabStaffScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.LabStaffFindFirstOrThrowArgs>;

export const LabStaffFindFirstOrThrowZodSchema = z.object({ select: LabStaffFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => LabStaffIncludeObjectSchema.optional()), orderBy: z.union([LabStaffOrderByWithRelationInputObjectSchema, LabStaffOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabStaffWhereInputObjectSchema.optional(), cursor: LabStaffWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([LabStaffScalarFieldEnumSchema, LabStaffScalarFieldEnumSchema.array()]).optional() }).strict();