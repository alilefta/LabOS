import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { CaseStatusSchema } from '../enums/CaseStatus.schema';
import { EnumCaseStatusFieldUpdateOperationsInputObjectSchema as EnumCaseStatusFieldUpdateOperationsInputObjectSchema } from './EnumCaseStatusFieldUpdateOperationsInput.schema';
import { NullableDecimalFieldUpdateOperationsInputObjectSchema as NullableDecimalFieldUpdateOperationsInputObjectSchema } from './NullableDecimalFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { PatientUpdateOneRequiredWithoutCasesNestedInputObjectSchema as PatientUpdateOneRequiredWithoutCasesNestedInputObjectSchema } from './PatientUpdateOneRequiredWithoutCasesNestedInput.schema';
import { LabUpdateOneRequiredWithoutCasesNestedInputObjectSchema as LabUpdateOneRequiredWithoutCasesNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutCasesNestedInput.schema';
import { CaseWorkItemUpdateManyWithoutDentalCaseNestedInputObjectSchema as CaseWorkItemUpdateManyWithoutDentalCaseNestedInputObjectSchema } from './CaseWorkItemUpdateManyWithoutDentalCaseNestedInput.schema';
import { CaseCategoryUpdateOneWithoutCasesNestedInputObjectSchema as CaseCategoryUpdateOneWithoutCasesNestedInputObjectSchema } from './CaseCategoryUpdateOneWithoutCasesNestedInput.schema';
import { ClinicUpdateOneWithoutCasesNestedInputObjectSchema as ClinicUpdateOneWithoutCasesNestedInputObjectSchema } from './ClinicUpdateOneWithoutCasesNestedInput.schema';
import { DentistUpdateOneWithoutCasesNestedInputObjectSchema as DentistUpdateOneWithoutCasesNestedInputObjectSchema } from './DentistUpdateOneWithoutCasesNestedInput.schema';
import { CaseStaffAssignmentUpdateManyWithoutCaseNestedInputObjectSchema as CaseStaffAssignmentUpdateManyWithoutCaseNestedInputObjectSchema } from './CaseStaffAssignmentUpdateManyWithoutCaseNestedInput.schema';
import { CaseActivityLogUpdateManyWithoutDentalCaseNestedInputObjectSchema as CaseActivityLogUpdateManyWithoutDentalCaseNestedInputObjectSchema } from './CaseActivityLogUpdateManyWithoutDentalCaseNestedInput.schema'

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
  notes: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  deadline: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  patient: z.lazy(() => PatientUpdateOneRequiredWithoutCasesNestedInputObjectSchema).optional(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutCasesNestedInputObjectSchema).optional(),
  caseItems: z.lazy(() => CaseWorkItemUpdateManyWithoutDentalCaseNestedInputObjectSchema).optional(),
  caseCategory: z.lazy(() => CaseCategoryUpdateOneWithoutCasesNestedInputObjectSchema).optional(),
  clinic: z.lazy(() => ClinicUpdateOneWithoutCasesNestedInputObjectSchema).optional(),
  dentist: z.lazy(() => DentistUpdateOneWithoutCasesNestedInputObjectSchema).optional(),
  staffAssignments: z.lazy(() => CaseStaffAssignmentUpdateManyWithoutCaseNestedInputObjectSchema).optional(),
  caseActivityLogs: z.lazy(() => CaseActivityLogUpdateManyWithoutDentalCaseNestedInputObjectSchema).optional()
}).strict();
export const CaseUpdateWithoutCaseAssetFilesInputObjectSchema: z.ZodType<Prisma.CaseUpdateWithoutCaseAssetFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateWithoutCaseAssetFilesInput>;
export const CaseUpdateWithoutCaseAssetFilesInputObjectZodSchema = makeSchema();
