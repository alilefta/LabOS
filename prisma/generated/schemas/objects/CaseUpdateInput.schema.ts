import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { CaseStatusSchema } from '../enums/CaseStatus.schema';
import { EnumCaseStatusFieldUpdateOperationsInputObjectSchema as EnumCaseStatusFieldUpdateOperationsInputObjectSchema } from './EnumCaseStatusFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { PatientUpdateOneRequiredWithoutCaseNestedInputObjectSchema as PatientUpdateOneRequiredWithoutCaseNestedInputObjectSchema } from './PatientUpdateOneRequiredWithoutCaseNestedInput.schema';
import { LabUpdateOneRequiredWithoutCasesNestedInputObjectSchema as LabUpdateOneRequiredWithoutCasesNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutCasesNestedInput.schema';
import { SalesRepresentativeUpdateOneWithoutCasesNestedInputObjectSchema as SalesRepresentativeUpdateOneWithoutCasesNestedInputObjectSchema } from './SalesRepresentativeUpdateOneWithoutCasesNestedInput.schema';
import { CaseWorkItemUpdateManyWithoutCaseNestedInputObjectSchema as CaseWorkItemUpdateManyWithoutCaseNestedInputObjectSchema } from './CaseWorkItemUpdateManyWithoutCaseNestedInput.schema';
import { CaseCategoryUpdateManyWithoutCasesNestedInputObjectSchema as CaseCategoryUpdateManyWithoutCasesNestedInputObjectSchema } from './CaseCategoryUpdateManyWithoutCasesNestedInput.schema';
import { ClinicUpdateOneWithoutCasesNestedInputObjectSchema as ClinicUpdateOneWithoutCasesNestedInputObjectSchema } from './ClinicUpdateOneWithoutCasesNestedInput.schema';
import { TechnicianUpdateOneWithoutCasesNestedInputObjectSchema as TechnicianUpdateOneWithoutCasesNestedInputObjectSchema } from './TechnicianUpdateOneWithoutCasesNestedInput.schema';
import { CaseAssetFileUpdateManyWithoutCaseNestedInputObjectSchema as CaseAssetFileUpdateManyWithoutCaseNestedInputObjectSchema } from './CaseAssetFileUpdateManyWithoutCaseNestedInput.schema'

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
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  deadline: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  patient: z.lazy(() => PatientUpdateOneRequiredWithoutCaseNestedInputObjectSchema).optional(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutCasesNestedInputObjectSchema).optional(),
  salesReps: z.lazy(() => SalesRepresentativeUpdateOneWithoutCasesNestedInputObjectSchema).optional(),
  caseItems: z.lazy(() => CaseWorkItemUpdateManyWithoutCaseNestedInputObjectSchema).optional(),
  caseCategory: z.lazy(() => CaseCategoryUpdateManyWithoutCasesNestedInputObjectSchema).optional(),
  clinic: z.lazy(() => ClinicUpdateOneWithoutCasesNestedInputObjectSchema).optional(),
  Technician: z.lazy(() => TechnicianUpdateOneWithoutCasesNestedInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileUpdateManyWithoutCaseNestedInputObjectSchema).optional()
}).strict();
export const CaseUpdateInputObjectSchema: z.ZodType<Prisma.CaseUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateInput>;
export const CaseUpdateInputObjectZodSchema = makeSchema();
