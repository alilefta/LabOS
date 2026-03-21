import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabUserIncludeObjectSchema as LabUserIncludeObjectSchema } from './objects/LabUserInclude.schema';
import { LabUserOrderByWithRelationInputObjectSchema as LabUserOrderByWithRelationInputObjectSchema } from './objects/LabUserOrderByWithRelationInput.schema';
import { LabUserWhereInputObjectSchema as LabUserWhereInputObjectSchema } from './objects/LabUserWhereInput.schema';
import { LabUserWhereUniqueInputObjectSchema as LabUserWhereUniqueInputObjectSchema } from './objects/LabUserWhereUniqueInput.schema';
import { LabUserScalarFieldEnumSchema } from './enums/LabUserScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const LabUserFindManySelectSchema: z.ZodType<Prisma.LabUserSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    city: z.boolean().optional(),
    zipcode: z.boolean().optional(),
    address1: z.boolean().optional(),
    address2: z.boolean().optional(),
    avatarUrl: z.boolean().optional(),
    secondaryEmail: z.boolean().optional(),
    phoneNumber: z.boolean().optional(),
    role: z.boolean().optional(),
    authUserId: z.boolean().optional(),
    authUser: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    isActive: z.boolean().optional(),
    lastTimeActive: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.LabUserSelect>;

export const LabUserFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    city: z.boolean().optional(),
    zipcode: z.boolean().optional(),
    address1: z.boolean().optional(),
    address2: z.boolean().optional(),
    avatarUrl: z.boolean().optional(),
    secondaryEmail: z.boolean().optional(),
    phoneNumber: z.boolean().optional(),
    role: z.boolean().optional(),
    authUserId: z.boolean().optional(),
    authUser: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    isActive: z.boolean().optional(),
    lastTimeActive: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const LabUserFindManySchema: z.ZodType<Prisma.LabUserFindManyArgs> = z.object({ select: LabUserFindManySelectSchema.optional(), include: z.lazy(() => LabUserIncludeObjectSchema.optional()), orderBy: z.union([LabUserOrderByWithRelationInputObjectSchema, LabUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabUserWhereInputObjectSchema.optional(), cursor: LabUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([LabUserScalarFieldEnumSchema, LabUserScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.LabUserFindManyArgs>;

export const LabUserFindManyZodSchema = z.object({ select: LabUserFindManySelectSchema.optional(), include: z.lazy(() => LabUserIncludeObjectSchema.optional()), orderBy: z.union([LabUserOrderByWithRelationInputObjectSchema, LabUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabUserWhereInputObjectSchema.optional(), cursor: LabUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([LabUserScalarFieldEnumSchema, LabUserScalarFieldEnumSchema.array()]).optional() }).strict();