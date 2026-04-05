import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { StaffRoleCategorySchema } from '../enums/StaffRoleCategory.schema';
import { EnumStaffRoleCategoryFieldUpdateOperationsInputObjectSchema as EnumStaffRoleCategoryFieldUpdateOperationsInputObjectSchema } from './EnumStaffRoleCategoryFieldUpdateOperationsInput.schema';
import { CommissionTypeSchema } from '../enums/CommissionType.schema';
import { EnumCommissionTypeFieldUpdateOperationsInputObjectSchema as EnumCommissionTypeFieldUpdateOperationsInputObjectSchema } from './EnumCommissionTypeFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CaseUpdateOneRequiredWithoutStaffAssignmentsNestedInputObjectSchema as CaseUpdateOneRequiredWithoutStaffAssignmentsNestedInputObjectSchema } from './CaseUpdateOneRequiredWithoutStaffAssignmentsNestedInput.schema';
import { LabStaffUpdateOneRequiredWithoutCasesNestedInputObjectSchema as LabStaffUpdateOneRequiredWithoutCasesNestedInputObjectSchema } from './LabStaffUpdateOneRequiredWithoutCasesNestedInput.schema';
import { LabUpdateOneRequiredWithoutStaffAssignmentsNestedInputObjectSchema as LabUpdateOneRequiredWithoutStaffAssignmentsNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutStaffAssignmentsNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  roleCategory: z.union([StaffRoleCategorySchema, z.lazy(() => EnumStaffRoleCategoryFieldUpdateOperationsInputObjectSchema)]).optional(),
  commissionType: z.union([CommissionTypeSchema, z.lazy(() => EnumCommissionTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  commissionValue: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'commissionValue' must be a Decimal",
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  commissionTotal: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'commissionTotal' must be a Decimal",
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  isPaid: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  paidAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  case: z.lazy(() => CaseUpdateOneRequiredWithoutStaffAssignmentsNestedInputObjectSchema).optional(),
  staff: z.lazy(() => LabStaffUpdateOneRequiredWithoutCasesNestedInputObjectSchema).optional(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutStaffAssignmentsNestedInputObjectSchema).optional()
}).strict();
export const CaseStaffAssignmentUpdateInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUpdateInput>;
export const CaseStaffAssignmentUpdateInputObjectZodSchema = makeSchema();
