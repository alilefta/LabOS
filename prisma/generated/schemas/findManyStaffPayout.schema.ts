import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StaffPayoutIncludeObjectSchema as StaffPayoutIncludeObjectSchema } from './objects/StaffPayoutInclude.schema';
import { StaffPayoutOrderByWithRelationInputObjectSchema as StaffPayoutOrderByWithRelationInputObjectSchema } from './objects/StaffPayoutOrderByWithRelationInput.schema';
import { StaffPayoutWhereInputObjectSchema as StaffPayoutWhereInputObjectSchema } from './objects/StaffPayoutWhereInput.schema';
import { StaffPayoutWhereUniqueInputObjectSchema as StaffPayoutWhereUniqueInputObjectSchema } from './objects/StaffPayoutWhereUniqueInput.schema';
import { StaffPayoutScalarFieldEnumSchema } from './enums/StaffPayoutScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const StaffPayoutFindManySelectSchema: z.ZodType<Prisma.StaffPayoutSelect> = z.object({
    id: z.boolean().optional(),
    payoutNumber: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    staffId: z.boolean().optional(),
    staff: z.boolean().optional(),
    amount: z.boolean().optional(),
    method: z.boolean().optional(),
    status: z.boolean().optional(),
    reference: z.boolean().optional(),
    notes: z.boolean().optional(),
    caseAssignments: z.boolean().optional(),
    paidAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.StaffPayoutSelect>;

export const StaffPayoutFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    payoutNumber: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    staffId: z.boolean().optional(),
    staff: z.boolean().optional(),
    amount: z.boolean().optional(),
    method: z.boolean().optional(),
    status: z.boolean().optional(),
    reference: z.boolean().optional(),
    notes: z.boolean().optional(),
    caseAssignments: z.boolean().optional(),
    paidAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const StaffPayoutFindManySchema: z.ZodType<Prisma.StaffPayoutFindManyArgs> = z.object({ select: StaffPayoutFindManySelectSchema.optional(), include: z.lazy(() => StaffPayoutIncludeObjectSchema.optional()), orderBy: z.union([StaffPayoutOrderByWithRelationInputObjectSchema, StaffPayoutOrderByWithRelationInputObjectSchema.array()]).optional(), where: StaffPayoutWhereInputObjectSchema.optional(), cursor: StaffPayoutWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([StaffPayoutScalarFieldEnumSchema, StaffPayoutScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.StaffPayoutFindManyArgs>;

export const StaffPayoutFindManyZodSchema = z.object({ select: StaffPayoutFindManySelectSchema.optional(), include: z.lazy(() => StaffPayoutIncludeObjectSchema.optional()), orderBy: z.union([StaffPayoutOrderByWithRelationInputObjectSchema, StaffPayoutOrderByWithRelationInputObjectSchema.array()]).optional(), where: StaffPayoutWhereInputObjectSchema.optional(), cursor: StaffPayoutWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([StaffPayoutScalarFieldEnumSchema, StaffPayoutScalarFieldEnumSchema.array()]).optional() }).strict();