import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { MemberIncludeObjectSchema as MemberIncludeObjectSchema } from './objects/MemberInclude.schema';
import { MemberOrderByWithRelationInputObjectSchema as MemberOrderByWithRelationInputObjectSchema } from './objects/MemberOrderByWithRelationInput.schema';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './objects/MemberWhereInput.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './objects/MemberWhereUniqueInput.schema';
import { MemberScalarFieldEnumSchema } from './enums/MemberScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const MemberFindFirstOrThrowSelectSchema: z.ZodType<Prisma.MemberSelect> = z.object({
    id: z.boolean().optional(),
    organizationId: z.boolean().optional(),
    organization: z.boolean().optional(),
    userId: z.boolean().optional(),
    authuser: z.boolean().optional(),
    role: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    labStaff: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.MemberSelect>;

export const MemberFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    organizationId: z.boolean().optional(),
    organization: z.boolean().optional(),
    userId: z.boolean().optional(),
    authuser: z.boolean().optional(),
    role: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    labStaff: z.boolean().optional()
  }).strict();

export const MemberFindFirstOrThrowSchema: z.ZodType<Prisma.MemberFindFirstOrThrowArgs> = z.object({ select: MemberFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => MemberIncludeObjectSchema.optional()), orderBy: z.union([MemberOrderByWithRelationInputObjectSchema, MemberOrderByWithRelationInputObjectSchema.array()]).optional(), where: MemberWhereInputObjectSchema.optional(), cursor: MemberWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([MemberScalarFieldEnumSchema, MemberScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.MemberFindFirstOrThrowArgs>;

export const MemberFindFirstOrThrowZodSchema = z.object({ select: MemberFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => MemberIncludeObjectSchema.optional()), orderBy: z.union([MemberOrderByWithRelationInputObjectSchema, MemberOrderByWithRelationInputObjectSchema.array()]).optional(), where: MemberWhereInputObjectSchema.optional(), cursor: MemberWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([MemberScalarFieldEnumSchema, MemberScalarFieldEnumSchema.array()]).optional() }).strict();