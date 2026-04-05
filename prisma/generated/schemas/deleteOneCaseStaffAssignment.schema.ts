import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseStaffAssignmentSelectObjectSchema as CaseStaffAssignmentSelectObjectSchema } from './objects/CaseStaffAssignmentSelect.schema';
import { CaseStaffAssignmentIncludeObjectSchema as CaseStaffAssignmentIncludeObjectSchema } from './objects/CaseStaffAssignmentInclude.schema';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './objects/CaseStaffAssignmentWhereUniqueInput.schema';

export const CaseStaffAssignmentDeleteOneSchema: z.ZodType<Prisma.CaseStaffAssignmentDeleteArgs> = z.object({ select: CaseStaffAssignmentSelectObjectSchema.optional(), include: CaseStaffAssignmentIncludeObjectSchema.optional(), where: CaseStaffAssignmentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseStaffAssignmentDeleteArgs>;

export const CaseStaffAssignmentDeleteOneZodSchema = z.object({ select: CaseStaffAssignmentSelectObjectSchema.optional(), include: CaseStaffAssignmentIncludeObjectSchema.optional(), where: CaseStaffAssignmentWhereUniqueInputObjectSchema }).strict();