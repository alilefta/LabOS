import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { CaseStatusSchema } from '../enums/CaseStatus.schema';
import { PatientCreateNestedOneWithoutCasesInputObjectSchema as PatientCreateNestedOneWithoutCasesInputObjectSchema } from './PatientCreateNestedOneWithoutCasesInput.schema';
import { LabCreateNestedOneWithoutCasesInputObjectSchema as LabCreateNestedOneWithoutCasesInputObjectSchema } from './LabCreateNestedOneWithoutCasesInput.schema';
import { CaseWorkItemCreateNestedManyWithoutDentalCaseInputObjectSchema as CaseWorkItemCreateNestedManyWithoutDentalCaseInputObjectSchema } from './CaseWorkItemCreateNestedManyWithoutDentalCaseInput.schema';
import { CaseCategoryCreateNestedOneWithoutCasesInputObjectSchema as CaseCategoryCreateNestedOneWithoutCasesInputObjectSchema } from './CaseCategoryCreateNestedOneWithoutCasesInput.schema';
import { ClinicCreateNestedOneWithoutCasesInputObjectSchema as ClinicCreateNestedOneWithoutCasesInputObjectSchema } from './ClinicCreateNestedOneWithoutCasesInput.schema';
import { DentistCreateNestedOneWithoutCasesInputObjectSchema as DentistCreateNestedOneWithoutCasesInputObjectSchema } from './DentistCreateNestedOneWithoutCasesInput.schema';
import { CaseStaffAssignmentCreateNestedManyWithoutCaseInputObjectSchema as CaseStaffAssignmentCreateNestedManyWithoutCaseInputObjectSchema } from './CaseStaffAssignmentCreateNestedManyWithoutCaseInput.schema'

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
}).optional().nullable(),
  notes: z.string().optional().nullable(),
  deadline: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patient: z.lazy(() => PatientCreateNestedOneWithoutCasesInputObjectSchema),
  lab: z.lazy(() => LabCreateNestedOneWithoutCasesInputObjectSchema),
  caseItems: z.lazy(() => CaseWorkItemCreateNestedManyWithoutDentalCaseInputObjectSchema).optional(),
  caseCategory: z.lazy(() => CaseCategoryCreateNestedOneWithoutCasesInputObjectSchema).optional(),
  clinic: z.lazy(() => ClinicCreateNestedOneWithoutCasesInputObjectSchema).optional(),
  dentist: z.lazy(() => DentistCreateNestedOneWithoutCasesInputObjectSchema).optional(),
  staffAssignments: z.lazy(() => CaseStaffAssignmentCreateNestedManyWithoutCaseInputObjectSchema).optional()
}).strict();
export const CaseCreateWithoutCaseAssetFilesInputObjectSchema: z.ZodType<Prisma.CaseCreateWithoutCaseAssetFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateWithoutCaseAssetFilesInput>;
export const CaseCreateWithoutCaseAssetFilesInputObjectZodSchema = makeSchema();
