import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { CaseStatusSchema } from '../enums/CaseStatus.schema';
import { EnumCaseStatusFieldUpdateOperationsInputObjectSchema as EnumCaseStatusFieldUpdateOperationsInputObjectSchema } from './EnumCaseStatusFieldUpdateOperationsInput.schema';
import { NullableDecimalFieldUpdateOperationsInputObjectSchema as NullableDecimalFieldUpdateOperationsInputObjectSchema } from './NullableDecimalFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { FaultPartySchema } from '../enums/FaultParty.schema';
import { NullableEnumFaultPartyFieldUpdateOperationsInputObjectSchema as NullableEnumFaultPartyFieldUpdateOperationsInputObjectSchema } from './NullableEnumFaultPartyFieldUpdateOperationsInput.schema';
import { CaseWorkItemUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema as CaseWorkItemUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema } from './CaseWorkItemUncheckedUpdateManyWithoutDentalCaseNestedInput.schema';
import { CaseStaffAssignmentUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema as CaseStaffAssignmentUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema } from './CaseStaffAssignmentUncheckedUpdateManyWithoutDentalCaseNestedInput.schema';
import { CaseActivityLogUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema as CaseActivityLogUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema } from './CaseActivityLogUncheckedUpdateManyWithoutDentalCaseNestedInput.schema';
import { CaseAssetFileUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema as CaseAssetFileUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema } from './CaseAssetFileUncheckedUpdateManyWithoutDentalCaseNestedInput.schema';
import { InvoiceCaseUncheckedUpdateOneWithoutCaseNestedInputObjectSchema as InvoiceCaseUncheckedUpdateOneWithoutCaseNestedInputObjectSchema } from './InvoiceCaseUncheckedUpdateOneWithoutCaseNestedInput.schema';
import { CaseUncheckedUpdateManyWithoutOriginalCaseNestedInputObjectSchema as CaseUncheckedUpdateManyWithoutOriginalCaseNestedInputObjectSchema } from './CaseUncheckedUpdateManyWithoutOriginalCaseNestedInput.schema'

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
  manualDiscountAmount: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'manualDiscountAmount' must be a Decimal",
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  manualDiscountReason: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  isWarranty: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  dentistId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  notes: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  deadline: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  isRemake: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  originalCaseId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  failureReason: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  failureFault: z.union([FaultPartySchema, z.lazy(() => NullableEnumFaultPartyFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  completedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  deliveredAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  caseItems: z.lazy(() => CaseWorkItemUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema).optional(),
  staffAssignments: z.lazy(() => CaseStaffAssignmentUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema).optional(),
  caseActivityLogs: z.lazy(() => CaseActivityLogUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema).optional(),
  invoiceCase: z.lazy(() => InvoiceCaseUncheckedUpdateOneWithoutCaseNestedInputObjectSchema).optional(),
  remakes: z.lazy(() => CaseUncheckedUpdateManyWithoutOriginalCaseNestedInputObjectSchema).optional()
}).strict();
export const CaseUncheckedUpdateWithoutClinicInputObjectSchema: z.ZodType<Prisma.CaseUncheckedUpdateWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUncheckedUpdateWithoutClinicInput>;
export const CaseUncheckedUpdateWithoutClinicInputObjectZodSchema = makeSchema();
