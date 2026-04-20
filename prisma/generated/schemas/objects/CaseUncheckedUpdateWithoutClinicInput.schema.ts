import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { CaseStatusSchema } from '../enums/CaseStatus.schema';
import { EnumCaseStatusFieldUpdateOperationsInputObjectSchema as EnumCaseStatusFieldUpdateOperationsInputObjectSchema } from './EnumCaseStatusFieldUpdateOperationsInput.schema';
import { NullableDecimalFieldUpdateOperationsInputObjectSchema as NullableDecimalFieldUpdateOperationsInputObjectSchema } from './NullableDecimalFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CaseWorkItemUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema as CaseWorkItemUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema } from './CaseWorkItemUncheckedUpdateManyWithoutDentalCaseNestedInput.schema';
import { CaseStaffAssignmentUncheckedUpdateManyWithoutCaseNestedInputObjectSchema as CaseStaffAssignmentUncheckedUpdateManyWithoutCaseNestedInputObjectSchema } from './CaseStaffAssignmentUncheckedUpdateManyWithoutCaseNestedInput.schema';
import { CaseActivityLogUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema as CaseActivityLogUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema } from './CaseActivityLogUncheckedUpdateManyWithoutDentalCaseNestedInput.schema';
import { CaseAssetFileUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema as CaseAssetFileUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema } from './CaseAssetFileUncheckedUpdateManyWithoutDentalCaseNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  patientId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  caseNumber: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  labId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  caseCategoryId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  status: z.union([CaseStatusSchema, z.lazy(() => EnumCaseStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  grandTotal: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'grandTotal' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  dentistId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  notes: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  deadline: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  caseItems: z.lazy(() => CaseWorkItemUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema).optional(),
  staffAssignments: z.lazy(() => CaseStaffAssignmentUncheckedUpdateManyWithoutCaseNestedInputObjectSchema).optional(),
  caseActivityLogs: z.lazy(() => CaseActivityLogUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema).optional()
}).strict();
export const CaseUncheckedUpdateWithoutClinicInputObjectSchema: z.ZodType<Prisma.CaseUncheckedUpdateWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUncheckedUpdateWithoutClinicInput>;
export const CaseUncheckedUpdateWithoutClinicInputObjectZodSchema = makeSchema();
