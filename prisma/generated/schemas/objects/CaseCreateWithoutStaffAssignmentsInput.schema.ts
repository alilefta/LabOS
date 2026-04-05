import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { CaseStatusSchema } from '../enums/CaseStatus.schema';
import { PatientCreateNestedOneWithoutCasesInputObjectSchema as PatientCreateNestedOneWithoutCasesInputObjectSchema } from './PatientCreateNestedOneWithoutCasesInput.schema';
import { LabCreateNestedOneWithoutCasesInputObjectSchema as LabCreateNestedOneWithoutCasesInputObjectSchema } from './LabCreateNestedOneWithoutCasesInput.schema';
import { CaseWorkItemCreateNestedManyWithoutDentalCaseInputObjectSchema as CaseWorkItemCreateNestedManyWithoutDentalCaseInputObjectSchema } from './CaseWorkItemCreateNestedManyWithoutDentalCaseInput.schema';
import { CaseCategoryCreateNestedOneWithoutCasesInputObjectSchema as CaseCategoryCreateNestedOneWithoutCasesInputObjectSchema } from './CaseCategoryCreateNestedOneWithoutCasesInput.schema';
import { ClinicCreateNestedOneWithoutCasesInputObjectSchema as ClinicCreateNestedOneWithoutCasesInputObjectSchema } from './ClinicCreateNestedOneWithoutCasesInput.schema';
import { DentistCreateNestedOneWithoutCasesInputObjectSchema as DentistCreateNestedOneWithoutCasesInputObjectSchema } from './DentistCreateNestedOneWithoutCasesInput.schema';
import { CaseAssetFileCreateNestedManyWithoutDentalCaseInputObjectSchema as CaseAssetFileCreateNestedManyWithoutDentalCaseInputObjectSchema } from './CaseAssetFileCreateNestedManyWithoutDentalCaseInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  caseNumber: z.string(),
  status: CaseStatusSchema.optional(),
  grandTotal: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'grandTotal' must be a Decimal",
}).optional(),
  deadline: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patient: z.lazy(() => PatientCreateNestedOneWithoutCasesInputObjectSchema),
  lab: z.lazy(() => LabCreateNestedOneWithoutCasesInputObjectSchema),
  caseItems: z.lazy(() => CaseWorkItemCreateNestedManyWithoutDentalCaseInputObjectSchema).optional(),
  caseCategory: z.lazy(() => CaseCategoryCreateNestedOneWithoutCasesInputObjectSchema).optional(),
  clinic: z.lazy(() => ClinicCreateNestedOneWithoutCasesInputObjectSchema).optional(),
  dentist: z.lazy(() => DentistCreateNestedOneWithoutCasesInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileCreateNestedManyWithoutDentalCaseInputObjectSchema).optional()
}).strict();
export const CaseCreateWithoutStaffAssignmentsInputObjectSchema: z.ZodType<Prisma.CaseCreateWithoutStaffAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateWithoutStaffAssignmentsInput>;
export const CaseCreateWithoutStaffAssignmentsInputObjectZodSchema = makeSchema();
