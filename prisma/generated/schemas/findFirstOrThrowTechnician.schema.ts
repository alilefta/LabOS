import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { TechnicianIncludeObjectSchema as TechnicianIncludeObjectSchema } from './objects/TechnicianInclude.schema';
import { TechnicianOrderByWithRelationInputObjectSchema as TechnicianOrderByWithRelationInputObjectSchema } from './objects/TechnicianOrderByWithRelationInput.schema';
import { TechnicianWhereInputObjectSchema as TechnicianWhereInputObjectSchema } from './objects/TechnicianWhereInput.schema';
import { TechnicianWhereUniqueInputObjectSchema as TechnicianWhereUniqueInputObjectSchema } from './objects/TechnicianWhereUniqueInput.schema';
import { TechnicianScalarFieldEnumSchema } from './enums/TechnicianScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TechnicianFindFirstOrThrowSelectSchema: z.ZodType<Prisma.TechnicianSelect> = z.object({
    id: z.boolean().optional(),
    firstName: z.boolean().optional(),
    lastName: z.boolean().optional(),
    city: z.boolean().optional(),
    zipcode: z.boolean().optional(),
    address1: z.boolean().optional(),
    address2: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    email: z.boolean().optional(),
    phoneNumber: z.boolean().optional(),
    avatarUrl: z.boolean().optional(),
    cases: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.TechnicianSelect>;

export const TechnicianFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    firstName: z.boolean().optional(),
    lastName: z.boolean().optional(),
    city: z.boolean().optional(),
    zipcode: z.boolean().optional(),
    address1: z.boolean().optional(),
    address2: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    email: z.boolean().optional(),
    phoneNumber: z.boolean().optional(),
    avatarUrl: z.boolean().optional(),
    cases: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const TechnicianFindFirstOrThrowSchema: z.ZodType<Prisma.TechnicianFindFirstOrThrowArgs> = z.object({ select: TechnicianFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => TechnicianIncludeObjectSchema.optional()), orderBy: z.union([TechnicianOrderByWithRelationInputObjectSchema, TechnicianOrderByWithRelationInputObjectSchema.array()]).optional(), where: TechnicianWhereInputObjectSchema.optional(), cursor: TechnicianWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([TechnicianScalarFieldEnumSchema, TechnicianScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.TechnicianFindFirstOrThrowArgs>;

export const TechnicianFindFirstOrThrowZodSchema = z.object({ select: TechnicianFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => TechnicianIncludeObjectSchema.optional()), orderBy: z.union([TechnicianOrderByWithRelationInputObjectSchema, TechnicianOrderByWithRelationInputObjectSchema.array()]).optional(), where: TechnicianWhereInputObjectSchema.optional(), cursor: TechnicianWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([TechnicianScalarFieldEnumSchema, TechnicianScalarFieldEnumSchema.array()]).optional() }).strict();