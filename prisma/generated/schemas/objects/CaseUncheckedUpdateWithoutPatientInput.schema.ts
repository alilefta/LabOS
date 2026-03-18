import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { CaseStatusSchema } from '../enums/CaseStatus.schema';
import { EnumCaseStatusFieldUpdateOperationsInputObjectSchema as EnumCaseStatusFieldUpdateOperationsInputObjectSchema } from './EnumCaseStatusFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CaseWorkItemUncheckedUpdateManyWithoutCaseNestedInputObjectSchema as CaseWorkItemUncheckedUpdateManyWithoutCaseNestedInputObjectSchema } from './CaseWorkItemUncheckedUpdateManyWithoutCaseNestedInput.schema';
import { CaseCategoryUncheckedUpdateManyWithoutCasesNestedInputObjectSchema as CaseCategoryUncheckedUpdateManyWithoutCasesNestedInputObjectSchema } from './CaseCategoryUncheckedUpdateManyWithoutCasesNestedInput.schema';
import { CaseAssetFileUncheckedUpdateManyWithoutCaseNestedInputObjectSchema as CaseAssetFileUncheckedUpdateManyWithoutCaseNestedInputObjectSchema } from './CaseAssetFileUncheckedUpdateManyWithoutCaseNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  labId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  salesRepsId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  status: z.union([CaseStatusSchema, z.lazy(() => EnumCaseStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  grandTotal: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'grandTotal' must be a Decimal",
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  clinicId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  technicianId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  deadline: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  caseItems: z.lazy(() => CaseWorkItemUncheckedUpdateManyWithoutCaseNestedInputObjectSchema).optional(),
  caseCategory: z.lazy(() => CaseCategoryUncheckedUpdateManyWithoutCasesNestedInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileUncheckedUpdateManyWithoutCaseNestedInputObjectSchema).optional()
}).strict();
export const CaseUncheckedUpdateWithoutPatientInputObjectSchema: z.ZodType<Prisma.CaseUncheckedUpdateWithoutPatientInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUncheckedUpdateWithoutPatientInput>;
export const CaseUncheckedUpdateWithoutPatientInputObjectZodSchema = makeSchema();
