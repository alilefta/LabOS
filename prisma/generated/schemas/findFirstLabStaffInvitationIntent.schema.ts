import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabStaffInvitationIntentIncludeObjectSchema as LabStaffInvitationIntentIncludeObjectSchema } from './objects/LabStaffInvitationIntentInclude.schema';
import { LabStaffInvitationIntentOrderByWithRelationInputObjectSchema as LabStaffInvitationIntentOrderByWithRelationInputObjectSchema } from './objects/LabStaffInvitationIntentOrderByWithRelationInput.schema';
import { LabStaffInvitationIntentWhereInputObjectSchema as LabStaffInvitationIntentWhereInputObjectSchema } from './objects/LabStaffInvitationIntentWhereInput.schema';
import { LabStaffInvitationIntentWhereUniqueInputObjectSchema as LabStaffInvitationIntentWhereUniqueInputObjectSchema } from './objects/LabStaffInvitationIntentWhereUniqueInput.schema';
import { LabStaffInvitationIntentScalarFieldEnumSchema } from './enums/LabStaffInvitationIntentScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const LabStaffInvitationIntentFindFirstSelectSchema: z.ZodType<Prisma.LabStaffInvitationIntentSelect> = z.object({
    id: z.boolean().optional(),
    invitationId: z.boolean().optional(),
    invitation: z.boolean().optional(),
    labId: z.boolean().optional(),
    labStaffId: z.boolean().optional(),
    labStaff: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentSelect>;

export const LabStaffInvitationIntentFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    invitationId: z.boolean().optional(),
    invitation: z.boolean().optional(),
    labId: z.boolean().optional(),
    labStaffId: z.boolean().optional(),
    labStaff: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const LabStaffInvitationIntentFindFirstSchema: z.ZodType<Prisma.LabStaffInvitationIntentFindFirstArgs> = z.object({ select: LabStaffInvitationIntentFindFirstSelectSchema.optional(), include: z.lazy(() => LabStaffInvitationIntentIncludeObjectSchema.optional()), orderBy: z.union([LabStaffInvitationIntentOrderByWithRelationInputObjectSchema, LabStaffInvitationIntentOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabStaffInvitationIntentWhereInputObjectSchema.optional(), cursor: LabStaffInvitationIntentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([LabStaffInvitationIntentScalarFieldEnumSchema, LabStaffInvitationIntentScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentFindFirstArgs>;

export const LabStaffInvitationIntentFindFirstZodSchema = z.object({ select: LabStaffInvitationIntentFindFirstSelectSchema.optional(), include: z.lazy(() => LabStaffInvitationIntentIncludeObjectSchema.optional()), orderBy: z.union([LabStaffInvitationIntentOrderByWithRelationInputObjectSchema, LabStaffInvitationIntentOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabStaffInvitationIntentWhereInputObjectSchema.optional(), cursor: LabStaffInvitationIntentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([LabStaffInvitationIntentScalarFieldEnumSchema, LabStaffInvitationIntentScalarFieldEnumSchema.array()]).optional() }).strict();