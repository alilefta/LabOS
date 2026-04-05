import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseStaffAssignmentSelectObjectSchema as CaseStaffAssignmentSelectObjectSchema } from './objects/CaseStaffAssignmentSelect.schema';
import { CaseStaffAssignmentIncludeObjectSchema as CaseStaffAssignmentIncludeObjectSchema } from './objects/CaseStaffAssignmentInclude.schema';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './objects/CaseStaffAssignmentWhereUniqueInput.schema';
import { CaseStaffAssignmentCreateInputObjectSchema as CaseStaffAssignmentCreateInputObjectSchema } from './objects/CaseStaffAssignmentCreateInput.schema';
import { CaseStaffAssignmentUncheckedCreateInputObjectSchema as CaseStaffAssignmentUncheckedCreateInputObjectSchema } from './objects/CaseStaffAssignmentUncheckedCreateInput.schema';
import { CaseStaffAssignmentUpdateInputObjectSchema as CaseStaffAssignmentUpdateInputObjectSchema } from './objects/CaseStaffAssignmentUpdateInput.schema';
import { CaseStaffAssignmentUncheckedUpdateInputObjectSchema as CaseStaffAssignmentUncheckedUpdateInputObjectSchema } from './objects/CaseStaffAssignmentUncheckedUpdateInput.schema';

export const CaseStaffAssignmentUpsertOneSchema: z.ZodType<Prisma.CaseStaffAssignmentUpsertArgs> = z.object({ select: CaseStaffAssignmentSelectObjectSchema.optional(), include: CaseStaffAssignmentIncludeObjectSchema.optional(), where: CaseStaffAssignmentWhereUniqueInputObjectSchema, create: z.union([ CaseStaffAssignmentCreateInputObjectSchema, CaseStaffAssignmentUncheckedCreateInputObjectSchema ]), update: z.union([ CaseStaffAssignmentUpdateInputObjectSchema, CaseStaffAssignmentUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUpsertArgs>;

export const CaseStaffAssignmentUpsertOneZodSchema = z.object({ select: CaseStaffAssignmentSelectObjectSchema.optional(), include: CaseStaffAssignmentIncludeObjectSchema.optional(), where: CaseStaffAssignmentWhereUniqueInputObjectSchema, create: z.union([ CaseStaffAssignmentCreateInputObjectSchema, CaseStaffAssignmentUncheckedCreateInputObjectSchema ]), update: z.union([ CaseStaffAssignmentUpdateInputObjectSchema, CaseStaffAssignmentUncheckedUpdateInputObjectSchema ]) }).strict();