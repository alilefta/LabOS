import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ClinicIncludeObjectSchema as ClinicIncludeObjectSchema } from './objects/ClinicInclude.schema';
import { ClinicOrderByWithRelationInputObjectSchema as ClinicOrderByWithRelationInputObjectSchema } from './objects/ClinicOrderByWithRelationInput.schema';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './objects/ClinicWhereInput.schema';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './objects/ClinicWhereUniqueInput.schema';
import { ClinicScalarFieldEnumSchema } from './enums/ClinicScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ClinicFindFirstSelectSchema: z.ZodType<Prisma.ClinicSelect> = z.object({
    id: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    website: z.boolean().optional(),
    notes: z.boolean().optional(),
    status: z.boolean().optional(),
    type: z.boolean().optional(),
    city: z.boolean().optional(),
    zipcode: z.boolean().optional(),
    address1: z.boolean().optional(),
    address2: z.boolean().optional(),
    email: z.boolean().optional(),
    phoneNumber: z.boolean().optional(),
    billingEmail: z.boolean().optional(),
    billingPhoneNumber: z.boolean().optional(),
    taxNumber: z.boolean().optional(),
    discount: z.boolean().optional(),
    creditLimit: z.boolean().optional(),
    currentBalance: z.boolean().optional(),
    cases: z.boolean().optional(),
    dentists: z.boolean().optional(),
    casePricingPlans: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ClinicSelect>;

export const ClinicFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    website: z.boolean().optional(),
    notes: z.boolean().optional(),
    status: z.boolean().optional(),
    type: z.boolean().optional(),
    city: z.boolean().optional(),
    zipcode: z.boolean().optional(),
    address1: z.boolean().optional(),
    address2: z.boolean().optional(),
    email: z.boolean().optional(),
    phoneNumber: z.boolean().optional(),
    billingEmail: z.boolean().optional(),
    billingPhoneNumber: z.boolean().optional(),
    taxNumber: z.boolean().optional(),
    discount: z.boolean().optional(),
    creditLimit: z.boolean().optional(),
    currentBalance: z.boolean().optional(),
    cases: z.boolean().optional(),
    dentists: z.boolean().optional(),
    casePricingPlans: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const ClinicFindFirstSchema: z.ZodType<Prisma.ClinicFindFirstArgs> = z.object({ select: ClinicFindFirstSelectSchema.optional(), include: z.lazy(() => ClinicIncludeObjectSchema.optional()), orderBy: z.union([ClinicOrderByWithRelationInputObjectSchema, ClinicOrderByWithRelationInputObjectSchema.array()]).optional(), where: ClinicWhereInputObjectSchema.optional(), cursor: ClinicWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ClinicScalarFieldEnumSchema, ClinicScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ClinicFindFirstArgs>;

export const ClinicFindFirstZodSchema = z.object({ select: ClinicFindFirstSelectSchema.optional(), include: z.lazy(() => ClinicIncludeObjectSchema.optional()), orderBy: z.union([ClinicOrderByWithRelationInputObjectSchema, ClinicOrderByWithRelationInputObjectSchema.array()]).optional(), where: ClinicWhereInputObjectSchema.optional(), cursor: ClinicWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ClinicScalarFieldEnumSchema, ClinicScalarFieldEnumSchema.array()]).optional() }).strict();