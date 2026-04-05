import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StaffRoleCategorySchema } from '../enums/StaffRoleCategory.schema';
import { CommissionTypeSchema } from '../enums/CommissionType.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  caseId: z.string(),
  labId: z.string(),
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
  updatedAt: z.coerce.date().optional()
}).strict();
export const CaseStaffAssignmentCreateManyStaffInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentCreateManyStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentCreateManyStaffInput>;
export const CaseStaffAssignmentCreateManyStaffInputObjectZodSchema = makeSchema();
