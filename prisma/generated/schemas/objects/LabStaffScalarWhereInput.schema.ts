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
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const labstaffscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => LabStaffScalarWhereInputObjectSchema), z.lazy(() => LabStaffScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => LabStaffScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => LabStaffScalarWhereInputObjectSchema), z.lazy(() => LabStaffScalarWhereInputObjectSchema).array()]).optional(),
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
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const LabStaffScalarWhereInputObjectSchema: z.ZodType<Prisma.LabStaffScalarWhereInput> = labstaffscalarwhereinputSchema as unknown as z.ZodType<Prisma.LabStaffScalarWhereInput>;
export const LabStaffScalarWhereInputObjectZodSchema = labstaffscalarwhereinputSchema;
