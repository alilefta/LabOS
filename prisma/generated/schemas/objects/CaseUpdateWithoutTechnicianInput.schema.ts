import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { CaseStatusSchema } from '../enums/CaseStatus.schema';
import { EnumCaseStatusFieldUpdateOperationsInputObjectSchema as EnumCaseStatusFieldUpdateOperationsInputObjectSchema } from './EnumCaseStatusFieldUpdateOperationsInput.schema';
import { NullableDecimalFieldUpdateOperationsInputObjectSchema as NullableDecimalFieldUpdateOperationsInputObjectSchema } from './NullableDecimalFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { PatientUpdateOneRequiredWithoutCasesNestedInputObjectSchema as PatientUpdateOneRequiredWithoutCasesNestedInputObjectSchema } from './PatientUpdateOneRequiredWithoutCasesNestedInput.schema';
import { LabUpdateOneRequiredWithoutCasesNestedInputObjectSchema as LabUpdateOneRequiredWithoutCasesNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutCasesNestedInput.schema';
import { SalesRepresentativeUpdateOneWithoutCasesNestedInputObjectSchema as SalesRepresentativeUpdateOneWithoutCasesNestedInputObjectSchema } from './SalesRepresentativeUpdateOneWithoutCasesNestedInput.schema';
import { CaseWorkItemUpdateManyWithoutDentalCaseNestedInputObjectSchema as CaseWorkItemUpdateManyWithoutDentalCaseNestedInputObjectSchema } from './CaseWorkItemUpdateManyWithoutDentalCaseNestedInput.schema';
import { CaseCategoryUpdateOneWithoutCasesNestedInputObjectSchema as CaseCategoryUpdateOneWithoutCasesNestedInputObjectSchema } from './CaseCategoryUpdateOneWithoutCasesNestedInput.schema';
import { ClinicUpdateOneWithoutCasesNestedInputObjectSchema as ClinicUpdateOneWithoutCasesNestedInputObjectSchema } from './ClinicUpdateOneWithoutCasesNestedInput.schema';
import { CaseAssetFileUpdateManyWithoutDentalCaseNestedInputObjectSchema as CaseAssetFileUpdateManyWithoutDentalCaseNestedInputObjectSchema } from './CaseAssetFileUpdateManyWithoutDentalCaseNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([CaseStatusSchema, z.lazy(() => EnumCaseStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  grandTotal: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'grandTotal' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  deadline: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  patient: z.lazy(() => PatientUpdateOneRequiredWithoutCasesNestedInputObjectSchema).optional(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutCasesNestedInputObjectSchema).optional(),
  salesReps: z.lazy(() => SalesRepresentativeUpdateOneWithoutCasesNestedInputObjectSchema).optional(),
  caseItems: z.lazy(() => CaseWorkItemUpdateManyWithoutDentalCaseNestedInputObjectSchema).optional(),
  caseCategory: z.lazy(() => CaseCategoryUpdateOneWithoutCasesNestedInputObjectSchema).optional(),
  clinic: z.lazy(() => ClinicUpdateOneWithoutCasesNestedInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileUpdateManyWithoutDentalCaseNestedInputObjectSchema).optional()
}).strict();
export const CaseUpdateWithoutTechnicianInputObjectSchema: z.ZodType<Prisma.CaseUpdateWithoutTechnicianInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateWithoutTechnicianInput>;
export const CaseUpdateWithoutTechnicianInputObjectZodSchema = makeSchema();
