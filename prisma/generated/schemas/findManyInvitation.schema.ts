import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvitationIncludeObjectSchema as InvitationIncludeObjectSchema } from './objects/InvitationInclude.schema';
import { InvitationOrderByWithRelationInputObjectSchema as InvitationOrderByWithRelationInputObjectSchema } from './objects/InvitationOrderByWithRelationInput.schema';
import { InvitationWhereInputObjectSchema as InvitationWhereInputObjectSchema } from './objects/InvitationWhereInput.schema';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './objects/InvitationWhereUniqueInput.schema';
import { InvitationScalarFieldEnumSchema } from './enums/InvitationScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const InvitationFindManySelectSchema: z.ZodType<Prisma.InvitationSelect> = z.object({
    id: z.boolean().optional(),
    organizationId: z.boolean().optional(),
    organization: z.boolean().optional(),
    email: z.boolean().optional(),
    role: z.boolean().optional(),
    status: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    inviterId: z.boolean().optional(),
    authuser: z.boolean().optional(),
    labStaffIntent: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.InvitationSelect>;

export const InvitationFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    organizationId: z.boolean().optional(),
    organization: z.boolean().optional(),
    email: z.boolean().optional(),
    role: z.boolean().optional(),
    status: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    inviterId: z.boolean().optional(),
    authuser: z.boolean().optional(),
    labStaffIntent: z.boolean().optional()
  }).strict();

export const InvitationFindManySchema: z.ZodType<Prisma.InvitationFindManyArgs> = z.object({ select: InvitationFindManySelectSchema.optional(), include: z.lazy(() => InvitationIncludeObjectSchema.optional()), orderBy: z.union([InvitationOrderByWithRelationInputObjectSchema, InvitationOrderByWithRelationInputObjectSchema.array()]).optional(), where: InvitationWhereInputObjectSchema.optional(), cursor: InvitationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([InvitationScalarFieldEnumSchema, InvitationScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.InvitationFindManyArgs>;

export const InvitationFindManyZodSchema = z.object({ select: InvitationFindManySelectSchema.optional(), include: z.lazy(() => InvitationIncludeObjectSchema.optional()), orderBy: z.union([InvitationOrderByWithRelationInputObjectSchema, InvitationOrderByWithRelationInputObjectSchema.array()]).optional(), where: InvitationWhereInputObjectSchema.optional(), cursor: InvitationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([InvitationScalarFieldEnumSchema, InvitationScalarFieldEnumSchema.array()]).optional() }).strict();