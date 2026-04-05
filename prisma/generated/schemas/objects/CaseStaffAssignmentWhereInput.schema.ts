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
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { CaseScalarRelationFilterObjectSchema as CaseScalarRelationFilterObjectSchema } from './CaseScalarRelationFilter.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema';
import { LabStaffScalarRelationFilterObjectSchema as LabStaffScalarRelationFilterObjectSchema } from './LabStaffScalarRelationFilter.schema';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const casestaffassignmentwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseStaffAssignmentWhereInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseStaffAssignmentWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseStaffAssignmentWhereInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereInputObjectSchema).array()]).optional(),
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
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  case: z.union([z.lazy(() => CaseScalarRelationFilterObjectSchema), z.lazy(() => CaseWhereInputObjectSchema)]).optional(),
  staff: z.union([z.lazy(() => LabStaffScalarRelationFilterObjectSchema), z.lazy(() => LabStaffWhereInputObjectSchema)]).optional(),
  lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional()
}).strict();
export const CaseStaffAssignmentWhereInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentWhereInput> = casestaffassignmentwhereinputSchema as unknown as z.ZodType<Prisma.CaseStaffAssignmentWhereInput>;
export const CaseStaffAssignmentWhereInputObjectZodSchema = casestaffassignmentwhereinputSchema;
