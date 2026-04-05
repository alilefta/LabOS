import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { EnumStaffRoleCategoryFilterObjectSchema as EnumStaffRoleCategoryFilterObjectSchema } from './EnumStaffRoleCategoryFilter.schema';
import { StaffRoleCategorySchema } from '../enums/StaffRoleCategory.schema';
import { EnumCommissionTypeFilterObjectSchema as EnumCommissionTypeFilterObjectSchema } from './EnumCommissionTypeFilter.schema';
import { CommissionTypeSchema } from '../enums/CommissionType.schema';
import { DecimalNullableFilterObjectSchema as DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { CaseStaffAssignmentListRelationFilterObjectSchema as CaseStaffAssignmentListRelationFilterObjectSchema } from './CaseStaffAssignmentListRelationFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const labstaffwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => LabStaffWhereInputObjectSchema), z.lazy(() => LabStaffWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => LabStaffWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => LabStaffWhereInputObjectSchema), z.lazy(() => LabStaffWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  firstName: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  lastName: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  phoneNumber: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  avatarUrl: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  isActive: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  roleCategory: z.union([z.lazy(() => EnumStaffRoleCategoryFilterObjectSchema), StaffRoleCategorySchema]).optional(),
  jobTitle: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  specialization: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  commissionType: z.union([z.lazy(() => EnumCommissionTypeFilterObjectSchema), CommissionTypeSchema]).optional(),
  commissionValue: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'commissionValue' must be a Decimal",
})]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional(),
  cases: z.lazy(() => CaseStaffAssignmentListRelationFilterObjectSchema).optional()
}).strict();
export const LabStaffWhereInputObjectSchema: z.ZodType<Prisma.LabStaffWhereInput> = labstaffwhereinputSchema as unknown as z.ZodType<Prisma.LabStaffWhereInput>;
export const LabStaffWhereInputObjectZodSchema = labstaffwhereinputSchema;
