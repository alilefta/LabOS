import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumStaffRoleCategoryFilterObjectSchema as EnumStaffRoleCategoryFilterObjectSchema } from './EnumStaffRoleCategoryFilter.schema';
import { StaffRoleCategorySchema } from '../enums/StaffRoleCategory.schema';
import { EnumCommissionTypeFilterObjectSchema as EnumCommissionTypeFilterObjectSchema } from './EnumCommissionTypeFilter.schema';
import { CommissionTypeSchema } from '../enums/CommissionType.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const casestaffassignmentscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseStaffAssignmentScalarWhereInputObjectSchema), z.lazy(() => CaseStaffAssignmentScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseStaffAssignmentScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseStaffAssignmentScalarWhereInputObjectSchema), z.lazy(() => CaseStaffAssignmentScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  staffId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  roleCategory: z.union([z.lazy(() => EnumStaffRoleCategoryFilterObjectSchema), StaffRoleCategorySchema]).optional(),
  commissionType: z.union([z.lazy(() => EnumCommissionTypeFilterObjectSchema), CommissionTypeSchema]).optional(),
  commissionValue: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'commissionValue' must be a Decimal",
})]).optional(),
  commissionTotal: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'commissionTotal' must be a Decimal",
})]).optional(),
  isPaid: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  paidAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CaseStaffAssignmentScalarWhereInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentScalarWhereInput> = casestaffassignmentscalarwhereinputSchema as unknown as z.ZodType<Prisma.CaseStaffAssignmentScalarWhereInput>;
export const CaseStaffAssignmentScalarWhereInputObjectZodSchema = casestaffassignmentscalarwhereinputSchema;
