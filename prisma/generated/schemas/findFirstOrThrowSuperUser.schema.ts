import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SuperUserIncludeObjectSchema as SuperUserIncludeObjectSchema } from './objects/SuperUserInclude.schema';
import { SuperUserOrderByWithRelationInputObjectSchema as SuperUserOrderByWithRelationInputObjectSchema } from './objects/SuperUserOrderByWithRelationInput.schema';
import { SuperUserWhereInputObjectSchema as SuperUserWhereInputObjectSchema } from './objects/SuperUserWhereInput.schema';
import { SuperUserWhereUniqueInputObjectSchema as SuperUserWhereUniqueInputObjectSchema } from './objects/SuperUserWhereUniqueInput.schema';
import { SuperUserScalarFieldEnumSchema } from './enums/SuperUserScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const SuperUserFindFirstOrThrowSelectSchema: z.ZodType<Prisma.SuperUserSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    city: z.boolean().optional(),
    zipcode: z.boolean().optional(),
    address1: z.boolean().optional(),
    address2: z.boolean().optional(),
    avatarUrl: z.boolean().optional(),
    email: z.boolean().optional(),
    phoneNumber: z.boolean().optional(),
    role: z.boolean().optional(),
    authUserId: z.boolean().optional(),
    authUser: z.boolean().optional(),
    isActive: z.boolean().optional(),
    lastTimeActive: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.SuperUserSelect>;

export const SuperUserFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    city: z.boolean().optional(),
    zipcode: z.boolean().optional(),
    address1: z.boolean().optional(),
    address2: z.boolean().optional(),
    avatarUrl: z.boolean().optional(),
    email: z.boolean().optional(),
    phoneNumber: z.boolean().optional(),
    role: z.boolean().optional(),
    authUserId: z.boolean().optional(),
    authUser: z.boolean().optional(),
    isActive: z.boolean().optional(),
    lastTimeActive: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const SuperUserFindFirstOrThrowSchema: z.ZodType<Prisma.SuperUserFindFirstOrThrowArgs> = z.object({ select: SuperUserFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => SuperUserIncludeObjectSchema.optional()), orderBy: z.union([SuperUserOrderByWithRelationInputObjectSchema, SuperUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: SuperUserWhereInputObjectSchema.optional(), cursor: SuperUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([SuperUserScalarFieldEnumSchema, SuperUserScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.SuperUserFindFirstOrThrowArgs>;

export const SuperUserFindFirstOrThrowZodSchema = z.object({ select: SuperUserFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => SuperUserIncludeObjectSchema.optional()), orderBy: z.union([SuperUserOrderByWithRelationInputObjectSchema, SuperUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: SuperUserWhereInputObjectSchema.optional(), cursor: SuperUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([SuperUserScalarFieldEnumSchema, SuperUserScalarFieldEnumSchema.array()]).optional() }).strict();