import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { StaffRoleCategorySchema } from '../enums/StaffRoleCategory.schema';
import { EnumStaffRoleCategoryFieldUpdateOperationsInputObjectSchema as EnumStaffRoleCategoryFieldUpdateOperationsInputObjectSchema } from './EnumStaffRoleCategoryFieldUpdateOperationsInput.schema';
import { CommissionTypeSchema } from '../enums/CommissionType.schema';
import { EnumCommissionTypeFieldUpdateOperationsInputObjectSchema as EnumCommissionTypeFieldUpdateOperationsInputObjectSchema } from './EnumCommissionTypeFieldUpdateOperationsInput.schema';
import { NullableDecimalFieldUpdateOperationsInputObjectSchema as NullableDecimalFieldUpdateOperationsInputObjectSchema } from './NullableDecimalFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LabUpdateOneRequiredWithoutStaffNestedInputObjectSchema as LabUpdateOneRequiredWithoutStaffNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutStaffNestedInput.schema';
import { LabUserUpdateOneWithoutLabStaffNestedInputObjectSchema as LabUserUpdateOneWithoutLabStaffNestedInputObjectSchema } from './LabUserUpdateOneWithoutLabStaffNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  firstName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  lastName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  phoneNumber: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  avatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  city: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  address1: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  address2: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  zipcode: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  roleCategory: z.union([StaffRoleCategorySchema, z.lazy(() => EnumStaffRoleCategoryFieldUpdateOperationsInputObjectSchema)]).optional(),
  jobTitle: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  specialization: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  commissionType: z.union([CommissionTypeSchema, z.lazy(() => EnumCommissionTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  commissionValue: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'commissionValue' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutStaffNestedInputObjectSchema).optional(),
  labUser: z.lazy(() => LabUserUpdateOneWithoutLabStaffNestedInputObjectSchema).optional()
}).strict();
export const LabStaffUpdateWithoutCaseAssignmentsInputObjectSchema: z.ZodType<Prisma.LabStaffUpdateWithoutCaseAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpdateWithoutCaseAssignmentsInput>;
export const LabStaffUpdateWithoutCaseAssignmentsInputObjectZodSchema = makeSchema();
