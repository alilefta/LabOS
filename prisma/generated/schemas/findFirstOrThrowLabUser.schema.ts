import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabUserIncludeObjectSchema as LabUserIncludeObjectSchema } from './objects/LabUserInclude.schema';
import { LabUserOrderByWithRelationInputObjectSchema as LabUserOrderByWithRelationInputObjectSchema } from './objects/LabUserOrderByWithRelationInput.schema';
import { LabUserWhereInputObjectSchema as LabUserWhereInputObjectSchema } from './objects/LabUserWhereInput.schema';
import { LabUserWhereUniqueInputObjectSchema as LabUserWhereUniqueInputObjectSchema } from './objects/LabUserWhereUniqueInput.schema';
import { LabUserScalarFieldEnumSchema } from './enums/LabUserScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const LabUserFindFirstOrThrowSelectSchema: z.ZodType<Prisma.LabUserSelect> = z.object({
    id: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    authUserId: z.boolean().optional(),
    authUser: z.boolean().optional(),
    labStaffId: z.boolean().optional(),
    labStaff: z.boolean().optional(),
    role: z.boolean().optional(),
    isActive: z.boolean().optional(),
    lastTimeActive: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    activityLogs: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.LabUserSelect>;

export const LabUserFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    authUserId: z.boolean().optional(),
    authUser: z.boolean().optional(),
    labStaffId: z.boolean().optional(),
    labStaff: z.boolean().optional(),
    role: z.boolean().optional(),
    isActive: z.boolean().optional(),
    lastTimeActive: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    activityLogs: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const LabUserFindFirstOrThrowSchema: z.ZodType<Prisma.LabUserFindFirstOrThrowArgs> = z.object({ select: LabUserFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => LabUserIncludeObjectSchema.optional()), orderBy: z.union([LabUserOrderByWithRelationInputObjectSchema, LabUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabUserWhereInputObjectSchema.optional(), cursor: LabUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([LabUserScalarFieldEnumSchema, LabUserScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.LabUserFindFirstOrThrowArgs>;

export const LabUserFindFirstOrThrowZodSchema = z.object({ select: LabUserFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => LabUserIncludeObjectSchema.optional()), orderBy: z.union([LabUserOrderByWithRelationInputObjectSchema, LabUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabUserWhereInputObjectSchema.optional(), cursor: LabUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([LabUserScalarFieldEnumSchema, LabUserScalarFieldEnumSchema.array()]).optional() }).strict();