import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientArgsObjectSchema as PatientArgsObjectSchema } from './PatientArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { SalesRepresentativeArgsObjectSchema as SalesRepresentativeArgsObjectSchema } from './SalesRepresentativeArgs.schema';
import { CaseWorkItemFindManySchema as CaseWorkItemFindManySchema } from '../findManyCaseWorkItem.schema';
import { CaseCategoryFindManySchema as CaseCategoryFindManySchema } from '../findManyCaseCategory.schema';
import { ClinicArgsObjectSchema as ClinicArgsObjectSchema } from './ClinicArgs.schema';
import { TechnicianArgsObjectSchema as TechnicianArgsObjectSchema } from './TechnicianArgs.schema';
import { CaseAssetFileFindManySchema as CaseAssetFileFindManySchema } from '../findManyCaseAssetFile.schema';
import { CaseCountOutputTypeArgsObjectSchema as CaseCountOutputTypeArgsObjectSchema } from './CaseCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  patient: z.union([z.boolean(), z.lazy(() => PatientArgsObjectSchema)]).optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  salesReps: z.union([z.boolean(), z.lazy(() => SalesRepresentativeArgsObjectSchema)]).optional(),
  caseItems: z.union([z.boolean(), z.lazy(() => CaseWorkItemFindManySchema)]).optional(),
  caseCategory: z.union([z.boolean(), z.lazy(() => CaseCategoryFindManySchema)]).optional(),
  clinic: z.union([z.boolean(), z.lazy(() => ClinicArgsObjectSchema)]).optional(),
  Technician: z.union([z.boolean(), z.lazy(() => TechnicianArgsObjectSchema)]).optional(),
  caseAssetFiles: z.union([z.boolean(), z.lazy(() => CaseAssetFileFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CaseCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CaseIncludeObjectSchema: z.ZodType<Prisma.CaseInclude> = makeSchema() as unknown as z.ZodType<Prisma.CaseInclude>;
export const CaseIncludeObjectZodSchema = makeSchema();
