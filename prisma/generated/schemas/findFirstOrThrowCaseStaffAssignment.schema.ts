import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseStaffAssignmentIncludeObjectSchema as CaseStaffAssignmentIncludeObjectSchema } from './objects/CaseStaffAssignmentInclude.schema';
import { CaseStaffAssignmentOrderByWithRelationInputObjectSchema as CaseStaffAssignmentOrderByWithRelationInputObjectSchema } from './objects/CaseStaffAssignmentOrderByWithRelationInput.schema';
import { CaseStaffAssignmentWhereInputObjectSchema as CaseStaffAssignmentWhereInputObjectSchema } from './objects/CaseStaffAssignmentWhereInput.schema';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './objects/CaseStaffAssignmentWhereUniqueInput.schema';
import { CaseStaffAssignmentScalarFieldEnumSchema } from './enums/CaseStaffAssignmentScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CaseStaffAssignmentFindFirstOrThrowSelectSchema: z.ZodType<Prisma.CaseStaffAssignmentSelect> = z.object({
    id: z.boolean().optional(),
    caseId: z.boolean().optional(),
    case: z.boolean().optional(),
    staffId: z.boolean().optional(),
    staff: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    roleCategory: z.boolean().optional(),
    commissionType: z.boolean().optional(),
    commissionValue: z.boolean().optional(),
    commissionTotal: z.boolean().optional(),
    isPaid: z.boolean().optional(),
    paidAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CaseStaffAssignmentSelect>;

export const CaseStaffAssignmentFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    caseId: z.boolean().optional(),
    case: z.boolean().optional(),
    staffId: z.boolean().optional(),
    staff: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    roleCategory: z.boolean().optional(),
    commissionType: z.boolean().optional(),
    commissionValue: z.boolean().optional(),
    commissionTotal: z.boolean().optional(),
    isPaid: z.boolean().optional(),
    paidAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const CaseStaffAssignmentFindFirstOrThrowSchema: z.ZodType<Prisma.CaseStaffAssignmentFindFirstOrThrowArgs> = z.object({ select: CaseStaffAssignmentFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => CaseStaffAssignmentIncludeObjectSchema.optional()), orderBy: z.union([CaseStaffAssignmentOrderByWithRelationInputObjectSchema, CaseStaffAssignmentOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseStaffAssignmentWhereInputObjectSchema.optional(), cursor: CaseStaffAssignmentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseStaffAssignmentScalarFieldEnumSchema, CaseStaffAssignmentScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CaseStaffAssignmentFindFirstOrThrowArgs>;

export const CaseStaffAssignmentFindFirstOrThrowZodSchema = z.object({ select: CaseStaffAssignmentFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => CaseStaffAssignmentIncludeObjectSchema.optional()), orderBy: z.union([CaseStaffAssignmentOrderByWithRelationInputObjectSchema, CaseStaffAssignmentOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseStaffAssignmentWhereInputObjectSchema.optional(), cursor: CaseStaffAssignmentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseStaffAssignmentScalarFieldEnumSchema, CaseStaffAssignmentScalarFieldEnumSchema.array()]).optional() }).strict();