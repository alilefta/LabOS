import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseStaffAssignmentSelectObjectSchema as CaseStaffAssignmentSelectObjectSchema } from './objects/CaseStaffAssignmentSelect.schema';
import { CaseStaffAssignmentIncludeObjectSchema as CaseStaffAssignmentIncludeObjectSchema } from './objects/CaseStaffAssignmentInclude.schema';
import { CaseStaffAssignmentUpdateInputObjectSchema as CaseStaffAssignmentUpdateInputObjectSchema } from './objects/CaseStaffAssignmentUpdateInput.schema';
import { CaseStaffAssignmentUncheckedUpdateInputObjectSchema as CaseStaffAssignmentUncheckedUpdateInputObjectSchema } from './objects/CaseStaffAssignmentUncheckedUpdateInput.schema';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './objects/CaseStaffAssignmentWhereUniqueInput.schema';

export const CaseStaffAssignmentUpdateOneSchema: z.ZodType<Prisma.CaseStaffAssignmentUpdateArgs> = z.object({ select: CaseStaffAssignmentSelectObjectSchema.optional(), include: CaseStaffAssignmentIncludeObjectSchema.optional(), data: z.union([CaseStaffAssignmentUpdateInputObjectSchema, CaseStaffAssignmentUncheckedUpdateInputObjectSchema]), where: CaseStaffAssignmentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUpdateArgs>;

export const CaseStaffAssignmentUpdateOneZodSchema = z.object({ select: CaseStaffAssignmentSelectObjectSchema.optional(), include: CaseStaffAssignmentIncludeObjectSchema.optional(), data: z.union([CaseStaffAssignmentUpdateInputObjectSchema, CaseStaffAssignmentUncheckedUpdateInputObjectSchema]), where: CaseStaffAssignmentWhereUniqueInputObjectSchema }).strict();