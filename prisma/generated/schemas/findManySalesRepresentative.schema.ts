import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SalesRepresentativeIncludeObjectSchema as SalesRepresentativeIncludeObjectSchema } from './objects/SalesRepresentativeInclude.schema';
import { SalesRepresentativeOrderByWithRelationInputObjectSchema as SalesRepresentativeOrderByWithRelationInputObjectSchema } from './objects/SalesRepresentativeOrderByWithRelationInput.schema';
import { SalesRepresentativeWhereInputObjectSchema as SalesRepresentativeWhereInputObjectSchema } from './objects/SalesRepresentativeWhereInput.schema';
import { SalesRepresentativeWhereUniqueInputObjectSchema as SalesRepresentativeWhereUniqueInputObjectSchema } from './objects/SalesRepresentativeWhereUniqueInput.schema';
import { SalesRepresentativeScalarFieldEnumSchema } from './enums/SalesRepresentativeScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const SalesRepresentativeFindManySelectSchema: z.ZodType<Prisma.SalesRepresentativeSelect> = z.object({
    id: z.boolean().optional(),
    firstName: z.boolean().optional(),
    lastName: z.boolean().optional(),
    city: z.boolean().optional(),
    zipcode: z.boolean().optional(),
    address1: z.boolean().optional(),
    address2: z.boolean().optional(),
    labId: z.boolean().optional(),
    Lab: z.boolean().optional(),
    email: z.boolean().optional(),
    phoneNumber: z.boolean().optional(),
    avatarUrl: z.boolean().optional(),
    cases: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.SalesRepresentativeSelect>;

export const SalesRepresentativeFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    firstName: z.boolean().optional(),
    lastName: z.boolean().optional(),
    city: z.boolean().optional(),
    zipcode: z.boolean().optional(),
    address1: z.boolean().optional(),
    address2: z.boolean().optional(),
    labId: z.boolean().optional(),
    Lab: z.boolean().optional(),
    email: z.boolean().optional(),
    phoneNumber: z.boolean().optional(),
    avatarUrl: z.boolean().optional(),
    cases: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const SalesRepresentativeFindManySchema: z.ZodType<Prisma.SalesRepresentativeFindManyArgs> = z.object({ select: SalesRepresentativeFindManySelectSchema.optional(), include: z.lazy(() => SalesRepresentativeIncludeObjectSchema.optional()), orderBy: z.union([SalesRepresentativeOrderByWithRelationInputObjectSchema, SalesRepresentativeOrderByWithRelationInputObjectSchema.array()]).optional(), where: SalesRepresentativeWhereInputObjectSchema.optional(), cursor: SalesRepresentativeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([SalesRepresentativeScalarFieldEnumSchema, SalesRepresentativeScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.SalesRepresentativeFindManyArgs>;

export const SalesRepresentativeFindManyZodSchema = z.object({ select: SalesRepresentativeFindManySelectSchema.optional(), include: z.lazy(() => SalesRepresentativeIncludeObjectSchema.optional()), orderBy: z.union([SalesRepresentativeOrderByWithRelationInputObjectSchema, SalesRepresentativeOrderByWithRelationInputObjectSchema.array()]).optional(), where: SalesRepresentativeWhereInputObjectSchema.optional(), cursor: SalesRepresentativeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([SalesRepresentativeScalarFieldEnumSchema, SalesRepresentativeScalarFieldEnumSchema.array()]).optional() }).strict();