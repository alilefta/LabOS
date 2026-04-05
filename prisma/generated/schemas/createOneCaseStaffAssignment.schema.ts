import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseStaffAssignmentSelectObjectSchema as CaseStaffAssignmentSelectObjectSchema } from './objects/CaseStaffAssignmentSelect.schema';
import { CaseStaffAssignmentIncludeObjectSchema as CaseStaffAssignmentIncludeObjectSchema } from './objects/CaseStaffAssignmentInclude.schema';
import { CaseStaffAssignmentCreateInputObjectSchema as CaseStaffAssignmentCreateInputObjectSchema } from './objects/CaseStaffAssignmentCreateInput.schema';
import { CaseStaffAssignmentUncheckedCreateInputObjectSchema as CaseStaffAssignmentUncheckedCreateInputObjectSchema } from './objects/CaseStaffAssignmentUncheckedCreateInput.schema';

export const CaseStaffAssignmentCreateOneSchema: z.ZodType<Prisma.CaseStaffAssignmentCreateArgs> = z.object({ select: CaseStaffAssignmentSelectObjectSchema.optional(), include: CaseStaffAssignmentIncludeObjectSchema.optional(), data: z.union([CaseStaffAssignmentCreateInputObjectSchema, CaseStaffAssignmentUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.CaseStaffAssignmentCreateArgs>;

export const CaseStaffAssignmentCreateOneZodSchema = z.object({ select: CaseStaffAssignmentSelectObjectSchema.optional(), include: CaseStaffAssignmentIncludeObjectSchema.optional(), data: z.union([CaseStaffAssignmentCreateInputObjectSchema, CaseStaffAssignmentUncheckedCreateInputObjectSchema]) }).strict();