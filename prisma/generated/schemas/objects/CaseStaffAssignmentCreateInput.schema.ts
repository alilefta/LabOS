import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StaffRoleCategorySchema } from '../enums/StaffRoleCategory.schema';
import { CommissionTypeSchema } from '../enums/CommissionType.schema';
import { CaseCreateNestedOneWithoutStaffAssignmentsInputObjectSchema as CaseCreateNestedOneWithoutStaffAssignmentsInputObjectSchema } from './CaseCreateNestedOneWithoutStaffAssignmentsInput.schema';
import { LabStaffCreateNestedOneWithoutCasesInputObjectSchema as LabStaffCreateNestedOneWithoutCasesInputObjectSchema } from './LabStaffCreateNestedOneWithoutCasesInput.schema';
import { LabCreateNestedOneWithoutStaffAssignmentsInputObjectSchema as LabCreateNestedOneWithoutStaffAssignmentsInputObjectSchema } from './LabCreateNestedOneWithoutStaffAssignmentsInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  roleCategory: StaffRoleCategorySchema,
  commissionType: CommissionTypeSchema,
  commissionValue: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'commissionValue' must be a Decimal",
}),
  commissionTotal: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'commissionTotal' must be a Decimal",
}).optional(),
  isPaid: z.boolean().optional(),
  paidAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  case: z.lazy(() => CaseCreateNestedOneWithoutStaffAssignmentsInputObjectSchema),
  staff: z.lazy(() => LabStaffCreateNestedOneWithoutCasesInputObjectSchema),
  lab: z.lazy(() => LabCreateNestedOneWithoutStaffAssignmentsInputObjectSchema)
}).strict();
export const CaseStaffAssignmentCreateInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentCreateInput>;
export const CaseStaffAssignmentCreateInputObjectZodSchema = makeSchema();
