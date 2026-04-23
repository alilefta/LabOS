import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { CaseStatusSchema } from '../enums/CaseStatus.schema';
import { CaseStaffAssignmentUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema as CaseStaffAssignmentUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateNestedManyWithoutDentalCaseInput.schema';
import { CaseActivityLogUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema as CaseActivityLogUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema } from './CaseActivityLogUncheckedCreateNestedManyWithoutDentalCaseInput.schema';
import { CaseAssetFileUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema as CaseAssetFileUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema } from './CaseAssetFileUncheckedCreateNestedManyWithoutDentalCaseInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  patientId: z.string(),
  caseNumber: z.string(),
  labId: z.string(),
  caseCategoryId: z.string().optional().nullable(),
  status: CaseStatusSchema.optional(),
  grandTotal: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'grandTotal' must be a Decimal",
}).optional().nullable(),
  clinicId: z.string().optional().nullable(),
  dentistId: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  deadline: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  staffAssignments: z.lazy(() => CaseStaffAssignmentUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema).optional(),
  caseActivityLogs: z.lazy(() => CaseActivityLogUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema).optional()
}).strict();
export const CaseUncheckedCreateWithoutCaseItemsInputObjectSchema: z.ZodType<Prisma.CaseUncheckedCreateWithoutCaseItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUncheckedCreateWithoutCaseItemsInput>;
export const CaseUncheckedCreateWithoutCaseItemsInputObjectZodSchema = makeSchema();
