import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumCaseStatusFilterObjectSchema as EnumCaseStatusFilterObjectSchema } from './EnumCaseStatusFilter.schema';
import { CaseStatusSchema } from '../enums/CaseStatus.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { PatientScalarRelationFilterObjectSchema as PatientScalarRelationFilterObjectSchema } from './PatientScalarRelationFilter.schema';
import { PatientWhereInputObjectSchema as PatientWhereInputObjectSchema } from './PatientWhereInput.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { CaseWorkItemListRelationFilterObjectSchema as CaseWorkItemListRelationFilterObjectSchema } from './CaseWorkItemListRelationFilter.schema';
import { CaseCategoryNullableScalarRelationFilterObjectSchema as CaseCategoryNullableScalarRelationFilterObjectSchema } from './CaseCategoryNullableScalarRelationFilter.schema';
import { CaseCategoryWhereInputObjectSchema as CaseCategoryWhereInputObjectSchema } from './CaseCategoryWhereInput.schema';
import { ClinicNullableScalarRelationFilterObjectSchema as ClinicNullableScalarRelationFilterObjectSchema } from './ClinicNullableScalarRelationFilter.schema';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './ClinicWhereInput.schema';
import { DentistNullableScalarRelationFilterObjectSchema as DentistNullableScalarRelationFilterObjectSchema } from './DentistNullableScalarRelationFilter.schema';
import { DentistWhereInputObjectSchema as DentistWhereInputObjectSchema } from './DentistWhereInput.schema';
import { CaseStaffAssignmentListRelationFilterObjectSchema as CaseStaffAssignmentListRelationFilterObjectSchema } from './CaseStaffAssignmentListRelationFilter.schema';
import { CaseAssetFileListRelationFilterObjectSchema as CaseAssetFileListRelationFilterObjectSchema } from './CaseAssetFileListRelationFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const casewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseWhereInputObjectSchema), z.lazy(() => CaseWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseWhereInputObjectSchema), z.lazy(() => CaseWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  patientId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseNumber: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseCategoryId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  status: z.union([z.lazy(() => EnumCaseStatusFilterObjectSchema), CaseStatusSchema]).optional(),
  grandTotal: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'grandTotal' must be a Decimal",
})]).optional(),
  clinicId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  dentistId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  deadline: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  patient: z.union([z.lazy(() => PatientScalarRelationFilterObjectSchema), z.lazy(() => PatientWhereInputObjectSchema)]).optional(),
  lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional(),
  caseItems: z.lazy(() => CaseWorkItemListRelationFilterObjectSchema).optional(),
  caseCategory: z.union([z.lazy(() => CaseCategoryNullableScalarRelationFilterObjectSchema), z.lazy(() => CaseCategoryWhereInputObjectSchema)]).optional(),
  clinic: z.union([z.lazy(() => ClinicNullableScalarRelationFilterObjectSchema), z.lazy(() => ClinicWhereInputObjectSchema)]).optional(),
  dentist: z.union([z.lazy(() => DentistNullableScalarRelationFilterObjectSchema), z.lazy(() => DentistWhereInputObjectSchema)]).optional(),
  staffAssignments: z.lazy(() => CaseStaffAssignmentListRelationFilterObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileListRelationFilterObjectSchema).optional()
}).strict();
export const CaseWhereInputObjectSchema: z.ZodType<Prisma.CaseWhereInput> = casewhereinputSchema as unknown as z.ZodType<Prisma.CaseWhereInput>;
export const CaseWhereInputObjectZodSchema = casewhereinputSchema;
