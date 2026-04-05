import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumStaffRoleCategoryWithAggregatesFilterObjectSchema as EnumStaffRoleCategoryWithAggregatesFilterObjectSchema } from './EnumStaffRoleCategoryWithAggregatesFilter.schema';
import { StaffRoleCategorySchema } from '../enums/StaffRoleCategory.schema';
import { EnumCommissionTypeWithAggregatesFilterObjectSchema as EnumCommissionTypeWithAggregatesFilterObjectSchema } from './EnumCommissionTypeWithAggregatesFilter.schema';
import { CommissionTypeSchema } from '../enums/CommissionType.schema';
import { DecimalWithAggregatesFilterObjectSchema as DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const casestaffassignmentscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseStaffAssignmentScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CaseStaffAssignmentScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseStaffAssignmentScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseStaffAssignmentScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CaseStaffAssignmentScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  staffId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  roleCategory: z.union([z.lazy(() => EnumStaffRoleCategoryWithAggregatesFilterObjectSchema), StaffRoleCategorySchema]).optional(),
  commissionType: z.union([z.lazy(() => EnumCommissionTypeWithAggregatesFilterObjectSchema), CommissionTypeSchema]).optional(),
  commissionValue: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'commissionValue' must be a Decimal",
})]).optional(),
  commissionTotal: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'commissionTotal' must be a Decimal",
})]).optional(),
  isPaid: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  paidAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CaseStaffAssignmentScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentScalarWhereWithAggregatesInput> = casestaffassignmentscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.CaseStaffAssignmentScalarWhereWithAggregatesInput>;
export const CaseStaffAssignmentScalarWhereWithAggregatesInputObjectZodSchema = casestaffassignmentscalarwherewithaggregatesinputSchema;
