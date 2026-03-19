import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { AuthUserIncludeObjectSchema as AuthUserIncludeObjectSchema } from './objects/AuthUserInclude.schema';
import { AuthUserOrderByWithRelationInputObjectSchema as AuthUserOrderByWithRelationInputObjectSchema } from './objects/AuthUserOrderByWithRelationInput.schema';
import { AuthUserWhereInputObjectSchema as AuthUserWhereInputObjectSchema } from './objects/AuthUserWhereInput.schema';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './objects/AuthUserWhereUniqueInput.schema';
import { AuthUserScalarFieldEnumSchema } from './enums/AuthUserScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const AuthUserFindFirstSelectSchema: z.ZodType<Prisma.AuthUserSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    email: z.boolean().optional(),
    emailVerified: z.boolean().optional(),
    image: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    role: z.boolean().optional(),
    sessions: z.boolean().optional(),
    accounts: z.boolean().optional(),
    labUser: z.boolean().optional(),
    superUser: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.AuthUserSelect>;

export const AuthUserFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    email: z.boolean().optional(),
    emailVerified: z.boolean().optional(),
    image: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    role: z.boolean().optional(),
    sessions: z.boolean().optional(),
    accounts: z.boolean().optional(),
    labUser: z.boolean().optional(),
    superUser: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const AuthUserFindFirstSchema: z.ZodType<Prisma.AuthUserFindFirstArgs> = z.object({ select: AuthUserFindFirstSelectSchema.optional(), include: z.lazy(() => AuthUserIncludeObjectSchema.optional()), orderBy: z.union([AuthUserOrderByWithRelationInputObjectSchema, AuthUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: AuthUserWhereInputObjectSchema.optional(), cursor: AuthUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AuthUserScalarFieldEnumSchema, AuthUserScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.AuthUserFindFirstArgs>;

export const AuthUserFindFirstZodSchema = z.object({ select: AuthUserFindFirstSelectSchema.optional(), include: z.lazy(() => AuthUserIncludeObjectSchema.optional()), orderBy: z.union([AuthUserOrderByWithRelationInputObjectSchema, AuthUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: AuthUserWhereInputObjectSchema.optional(), cursor: AuthUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AuthUserScalarFieldEnumSchema, AuthUserScalarFieldEnumSchema.array()]).optional() }).strict();