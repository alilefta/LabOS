import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabInvitationIncludeObjectSchema as LabInvitationIncludeObjectSchema } from './objects/LabInvitationInclude.schema';
import { LabInvitationOrderByWithRelationInputObjectSchema as LabInvitationOrderByWithRelationInputObjectSchema } from './objects/LabInvitationOrderByWithRelationInput.schema';
import { LabInvitationWhereInputObjectSchema as LabInvitationWhereInputObjectSchema } from './objects/LabInvitationWhereInput.schema';
import { LabInvitationWhereUniqueInputObjectSchema as LabInvitationWhereUniqueInputObjectSchema } from './objects/LabInvitationWhereUniqueInput.schema';
import { LabInvitationScalarFieldEnumSchema } from './enums/LabInvitationScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const LabInvitationFindFirstOrThrowSelectSchema: z.ZodType<Prisma.LabInvitationSelect> = z.object({
    id: z.boolean().optional(),
    token: z.boolean().optional(),
    email: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    labStaffId: z.boolean().optional(),
    labStaff: z.boolean().optional(),
    roleToGrant: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.LabInvitationSelect>;

export const LabInvitationFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    token: z.boolean().optional(),
    email: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    labStaffId: z.boolean().optional(),
    labStaff: z.boolean().optional(),
    roleToGrant: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const LabInvitationFindFirstOrThrowSchema: z.ZodType<Prisma.LabInvitationFindFirstOrThrowArgs> = z.object({ select: LabInvitationFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => LabInvitationIncludeObjectSchema.optional()), orderBy: z.union([LabInvitationOrderByWithRelationInputObjectSchema, LabInvitationOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabInvitationWhereInputObjectSchema.optional(), cursor: LabInvitationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([LabInvitationScalarFieldEnumSchema, LabInvitationScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.LabInvitationFindFirstOrThrowArgs>;

export const LabInvitationFindFirstOrThrowZodSchema = z.object({ select: LabInvitationFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => LabInvitationIncludeObjectSchema.optional()), orderBy: z.union([LabInvitationOrderByWithRelationInputObjectSchema, LabInvitationOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabInvitationWhereInputObjectSchema.optional(), cursor: LabInvitationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([LabInvitationScalarFieldEnumSchema, LabInvitationScalarFieldEnumSchema.array()]).optional() }).strict();