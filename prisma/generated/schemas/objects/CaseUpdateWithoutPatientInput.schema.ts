import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { CaseStatusSchema } from '../enums/CaseStatus.schema';
import { EnumCaseStatusFieldUpdateOperationsInputObjectSchema as EnumCaseStatusFieldUpdateOperationsInputObjectSchema } from './EnumCaseStatusFieldUpdateOperationsInput.schema';
import { NullableDecimalFieldUpdateOperationsInputObjectSchema as NullableDecimalFieldUpdateOperationsInputObjectSchema } from './NullableDecimalFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { FaultPartySchema } from '../enums/FaultParty.schema';
import { NullableEnumFaultPartyFieldUpdateOperationsInputObjectSchema as NullableEnumFaultPartyFieldUpdateOperationsInputObjectSchema } from './NullableEnumFaultPartyFieldUpdateOperationsInput.schema';
import { LabUpdateOneRequiredWithoutCasesNestedInputObjectSchema as LabUpdateOneRequiredWithoutCasesNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutCasesNestedInput.schema';
import { CaseWorkItemUpdateManyWithoutDentalCaseNestedInputObjectSchema as CaseWorkItemUpdateManyWithoutDentalCaseNestedInputObjectSchema } from './CaseWorkItemUpdateManyWithoutDentalCaseNestedInput.schema';
import { CaseCategoryUpdateOneWithoutCasesNestedInputObjectSchema as CaseCategoryUpdateOneWithoutCasesNestedInputObjectSchema } from './CaseCategoryUpdateOneWithoutCasesNestedInput.schema';
import { ClinicUpdateOneWithoutCasesNestedInputObjectSchema as ClinicUpdateOneWithoutCasesNestedInputObjectSchema } from './ClinicUpdateOneWithoutCasesNestedInput.schema';
import { DentistUpdateOneWithoutCasesNestedInputObjectSchema as DentistUpdateOneWithoutCasesNestedInputObjectSchema } from './DentistUpdateOneWithoutCasesNestedInput.schema';
import { CaseStaffAssignmentUpdateManyWithoutDentalCaseNestedInputObjectSchema as CaseStaffAssignmentUpdateManyWithoutDentalCaseNestedInputObjectSchema } from './CaseStaffAssignmentUpdateManyWithoutDentalCaseNestedInput.schema';
import { CaseActivityLogUpdateManyWithoutDentalCaseNestedInputObjectSchema as CaseActivityLogUpdateManyWithoutDentalCaseNestedInputObjectSchema } from './CaseActivityLogUpdateManyWithoutDentalCaseNestedInput.schema';
import { CaseAssetFileUpdateManyWithoutDentalCaseNestedInputObjectSchema as CaseAssetFileUpdateManyWithoutDentalCaseNestedInputObjectSchema } from './CaseAssetFileUpdateManyWithoutDentalCaseNestedInput.schema';
import { InvoiceCaseUpdateOneWithoutCaseNestedInputObjectSchema as InvoiceCaseUpdateOneWithoutCaseNestedInputObjectSchema } from './InvoiceCaseUpdateOneWithoutCaseNestedInput.schema';
import { CaseUpdateOneWithoutRemakesNestedInputObjectSchema as CaseUpdateOneWithoutRemakesNestedInputObjectSchema } from './CaseUpdateOneWithoutRemakesNestedInput.schema';
import { CaseUpdateManyWithoutOriginalCaseNestedInputObjectSchema as CaseUpdateManyWithoutOriginalCaseNestedInputObjectSchema } from './CaseUpdateManyWithoutOriginalCaseNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  caseNumber: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
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
  notes: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  deadline: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  isRemake: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  failureReason: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  failureFault: z.union([FaultPartySchema, z.lazy(() => NullableEnumFaultPartyFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  completedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  deliveredAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutCasesNestedInputObjectSchema).optional(),
  caseItems: z.lazy(() => CaseWorkItemUpdateManyWithoutDentalCaseNestedInputObjectSchema).optional(),
  caseCategory: z.lazy(() => CaseCategoryUpdateOneWithoutCasesNestedInputObjectSchema).optional(),
  clinic: z.lazy(() => ClinicUpdateOneWithoutCasesNestedInputObjectSchema).optional(),
  dentist: z.lazy(() => DentistUpdateOneWithoutCasesNestedInputObjectSchema).optional(),
  staffAssignments: z.lazy(() => CaseStaffAssignmentUpdateManyWithoutDentalCaseNestedInputObjectSchema).optional(),
  caseActivityLogs: z.lazy(() => CaseActivityLogUpdateManyWithoutDentalCaseNestedInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileUpdateManyWithoutDentalCaseNestedInputObjectSchema).optional(),
  invoiceCase: z.lazy(() => InvoiceCaseUpdateOneWithoutCaseNestedInputObjectSchema).optional(),
  originalCase: z.lazy(() => CaseUpdateOneWithoutRemakesNestedInputObjectSchema).optional(),
  remakes: z.lazy(() => CaseUpdateManyWithoutOriginalCaseNestedInputObjectSchema).optional()
}).strict();
export const CaseUpdateWithoutPatientInputObjectSchema: z.ZodType<Prisma.CaseUpdateWithoutPatientInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateWithoutPatientInput>;
export const CaseUpdateWithoutPatientInputObjectZodSchema = makeSchema();
