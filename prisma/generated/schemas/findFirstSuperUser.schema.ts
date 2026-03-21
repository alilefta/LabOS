import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SuperUserIncludeObjectSchema as SuperUserIncludeObjectSchema } from './objects/SuperUserInclude.schema';
import { SuperUserOrderByWithRelationInputObjectSchema as SuperUserOrderByWithRelationInputObjectSchema } from './objects/SuperUserOrderByWithRelationInput.schema';
import { SuperUserWhereInputObjectSchema as SuperUserWhereInputObjectSchema } from './objects/SuperUserWhereInput.schema';
import { SuperUserWhereUniqueInputObjectSchema as SuperUserWhereUniqueInputObjectSchema } from './objects/SuperUserWhereUniqueInput.schema';
import { SuperUserScalarFieldEnumSchema } from './enums/SuperUserScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const SuperUserFindFirstSelectSchema: z.ZodType<Prisma.SuperUserSelect> = z.object({
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
    isActive: z.boolean().optional(),
    lastTimeActive: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.SuperUserSelect>;

export const SuperUserFindFirstSelectZodSchema = z.object({
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
    isActive: z.boolean().optional(),
    lastTimeActive: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const SuperUserFindFirstSchema: z.ZodType<Prisma.SuperUserFindFirstArgs> = z.object({ select: SuperUserFindFirstSelectSchema.optional(), include: z.lazy(() => SuperUserIncludeObjectSchema.optional()), orderBy: z.union([SuperUserOrderByWithRelationInputObjectSchema, SuperUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: SuperUserWhereInputObjectSchema.optional(), cursor: SuperUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([SuperUserScalarFieldEnumSchema, SuperUserScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.SuperUserFindFirstArgs>;

export const SuperUserFindFirstZodSchema = z.object({ select: SuperUserFindFirstSelectSchema.optional(), include: z.lazy(() => SuperUserIncludeObjectSchema.optional()), orderBy: z.union([SuperUserOrderByWithRelationInputObjectSchema, SuperUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: SuperUserWhereInputObjectSchema.optional(), cursor: SuperUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([SuperUserScalarFieldEnumSchema, SuperUserScalarFieldEnumSchema.array()]).optional() }).strict();