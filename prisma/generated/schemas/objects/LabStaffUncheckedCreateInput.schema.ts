import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StaffRoleCategorySchema } from '../enums/StaffRoleCategory.schema';
import { CommissionTypeSchema } from '../enums/CommissionType.schema';
import { CaseStaffAssignmentUncheckedCreateNestedManyWithoutStaffInputObjectSchema as CaseStaffAssignmentUncheckedCreateNestedManyWithoutStaffInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateNestedManyWithoutStaffInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  labId: z.string(),
  email: z.string().optional().nullable(),
  phoneNumber: z.string(),
  avatarUrl: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  roleCategory: StaffRoleCategorySchema,
  jobTitle: z.string().optional().nullable(),
  specialization: z.string().optional().nullable(),
  commissionType: CommissionTypeSchema.optional(),
  commissionValue: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'commissionValue' must be a Decimal",
}).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  cases: z.lazy(() => CaseStaffAssignmentUncheckedCreateNestedManyWithoutStaffInputObjectSchema).optional()
}).strict();
export const LabStaffUncheckedCreateInputObjectSchema: z.ZodType<Prisma.LabStaffUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUncheckedCreateInput>;
export const LabStaffUncheckedCreateInputObjectZodSchema = makeSchema();
