import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientArgsObjectSchema as PatientArgsObjectSchema } from './PatientArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { CaseWorkItemFindManySchema as CaseWorkItemFindManySchema } from '../findManyCaseWorkItem.schema';
import { CaseCategoryArgsObjectSchema as CaseCategoryArgsObjectSchema } from './CaseCategoryArgs.schema';
import { ClinicArgsObjectSchema as ClinicArgsObjectSchema } from './ClinicArgs.schema';
import { DentistArgsObjectSchema as DentistArgsObjectSchema } from './DentistArgs.schema';
import { CaseStaffAssignmentFindManySchema as CaseStaffAssignmentFindManySchema } from '../findManyCaseStaffAssignment.schema';
import { CaseAssetFileFindManySchema as CaseAssetFileFindManySchema } from '../findManyCaseAssetFile.schema';
import { CaseCountOutputTypeArgsObjectSchema as CaseCountOutputTypeArgsObjectSchema } from './CaseCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  patientId: z.boolean().optional(),
  patient: z.union([z.boolean(), z.lazy(() => PatientArgsObjectSchema)]).optional(),
  caseNumber: z.boolean().optional(),
  labId: z.boolean().optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  caseItems: z.union([z.boolean(), z.lazy(() => CaseWorkItemFindManySchema)]).optional(),
  caseCategoryId: z.boolean().optional(),
  caseCategory: z.union([z.boolean(), z.lazy(() => CaseCategoryArgsObjectSchema)]).optional(),
  status: z.boolean().optional(),
  grandTotal: z.boolean().optional(),
  clinicId: z.boolean().optional(),
  clinic: z.union([z.boolean(), z.lazy(() => ClinicArgsObjectSchema)]).optional(),
  dentistId: z.boolean().optional(),
  dentist: z.union([z.boolean(), z.lazy(() => DentistArgsObjectSchema)]).optional(),
  notes: z.boolean().optional(),
  staffAssignments: z.union([z.boolean(), z.lazy(() => CaseStaffAssignmentFindManySchema)]).optional(),
  caseAssetFiles: z.union([z.boolean(), z.lazy(() => CaseAssetFileFindManySchema)]).optional(),
  deadline: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => CaseCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CaseSelectObjectSchema: z.ZodType<Prisma.CaseSelect> = makeSchema() as unknown as z.ZodType<Prisma.CaseSelect>;
export const CaseSelectObjectZodSchema = makeSchema();
