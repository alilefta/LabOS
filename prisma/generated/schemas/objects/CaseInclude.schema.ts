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
  patient: z.union([z.boolean(), z.lazy(() => PatientArgsObjectSchema)]).optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  caseItems: z.union([z.boolean(), z.lazy(() => CaseWorkItemFindManySchema)]).optional(),
  caseCategory: z.union([z.boolean(), z.lazy(() => CaseCategoryArgsObjectSchema)]).optional(),
  clinic: z.union([z.boolean(), z.lazy(() => ClinicArgsObjectSchema)]).optional(),
  dentist: z.union([z.boolean(), z.lazy(() => DentistArgsObjectSchema)]).optional(),
  staffAssignments: z.union([z.boolean(), z.lazy(() => CaseStaffAssignmentFindManySchema)]).optional(),
  caseAssetFiles: z.union([z.boolean(), z.lazy(() => CaseAssetFileFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CaseCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CaseIncludeObjectSchema: z.ZodType<Prisma.CaseInclude> = makeSchema() as unknown as z.ZodType<Prisma.CaseInclude>;
export const CaseIncludeObjectZodSchema = makeSchema();
