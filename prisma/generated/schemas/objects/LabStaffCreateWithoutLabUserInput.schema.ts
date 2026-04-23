import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StaffRoleCategorySchema } from '../enums/StaffRoleCategory.schema';
import { CommissionTypeSchema } from '../enums/CommissionType.schema';
import { LabCreateNestedOneWithoutStaffInputObjectSchema as LabCreateNestedOneWithoutStaffInputObjectSchema } from './LabCreateNestedOneWithoutStaffInput.schema';
import { CaseStaffAssignmentCreateNestedManyWithoutStaffInputObjectSchema as CaseStaffAssignmentCreateNestedManyWithoutStaffInputObjectSchema } from './CaseStaffAssignmentCreateNestedManyWithoutStaffInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  avatarUrl: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  city: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional().nullable(),
  zipcode: z.string().optional().nullable(),
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
  updatedAt: z.coerce.date().optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutStaffInputObjectSchema),
  caseAssignments: z.lazy(() => CaseStaffAssignmentCreateNestedManyWithoutStaffInputObjectSchema).optional()
}).strict();
export const LabStaffCreateWithoutLabUserInputObjectSchema: z.ZodType<Prisma.LabStaffCreateWithoutLabUserInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCreateWithoutLabUserInput>;
export const LabStaffCreateWithoutLabUserInputObjectZodSchema = makeSchema();
