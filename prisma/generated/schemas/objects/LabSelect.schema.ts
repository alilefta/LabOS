import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabSubscriptionPlanArgsObjectSchema as LabSubscriptionPlanArgsObjectSchema } from './LabSubscriptionPlanArgs.schema';
import { LabUserFindManySchema as LabUserFindManySchema } from '../findManyLabUser.schema';
import { ClinicFindManySchema as ClinicFindManySchema } from '../findManyClinic.schema';
import { CaseFindManySchema as CaseFindManySchema } from '../findManyCase.schema';
import { CaseCategoryFindManySchema as CaseCategoryFindManySchema } from '../findManyCaseCategory.schema';
import { WorkTypeFindManySchema as WorkTypeFindManySchema } from '../findManyWorkType.schema';
import { ProductFindManySchema as ProductFindManySchema } from '../findManyProduct.schema';
import { CaseWorkItemFindManySchema as CaseWorkItemFindManySchema } from '../findManyCaseWorkItem.schema';
import { SelectedToothFindManySchema as SelectedToothFindManySchema } from '../findManySelectedTooth.schema';
import { CasePricingPlanFindManySchema as CasePricingPlanFindManySchema } from '../findManyCasePricingPlan.schema';
import { CaseAssetFileFindManySchema as CaseAssetFileFindManySchema } from '../findManyCaseAssetFile.schema';
import { PatientFindManySchema as PatientFindManySchema } from '../findManyPatient.schema';
import { DentistFindManySchema as DentistFindManySchema } from '../findManyDentist.schema';
import { CaseStaffAssignmentFindManySchema as CaseStaffAssignmentFindManySchema } from '../findManyCaseStaffAssignment.schema';
import { LabStaffFindManySchema as LabStaffFindManySchema } from '../findManyLabStaff.schema';
import { CaseActivityLogFindManySchema as CaseActivityLogFindManySchema } from '../findManyCaseActivityLog.schema';
import { LabCountOutputTypeArgsObjectSchema as LabCountOutputTypeArgsObjectSchema } from './LabCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  slug: z.boolean().optional(),
  brandAvatarUrl: z.boolean().optional(),
  subtitle: z.boolean().optional(),
  labSubscriptionPlan: z.union([z.boolean(), z.lazy(() => LabSubscriptionPlanArgsObjectSchema)]).optional(),
  users: z.union([z.boolean(), z.lazy(() => LabUserFindManySchema)]).optional(),
  clinics: z.union([z.boolean(), z.lazy(() => ClinicFindManySchema)]).optional(),
  cases: z.union([z.boolean(), z.lazy(() => CaseFindManySchema)]).optional(),
  caseCategories: z.union([z.boolean(), z.lazy(() => CaseCategoryFindManySchema)]).optional(),
  workTypes: z.union([z.boolean(), z.lazy(() => WorkTypeFindManySchema)]).optional(),
  products: z.union([z.boolean(), z.lazy(() => ProductFindManySchema)]).optional(),
  caseWorkItems: z.union([z.boolean(), z.lazy(() => CaseWorkItemFindManySchema)]).optional(),
  selectedTeeth: z.union([z.boolean(), z.lazy(() => SelectedToothFindManySchema)]).optional(),
  casePricingPlans: z.union([z.boolean(), z.lazy(() => CasePricingPlanFindManySchema)]).optional(),
  caseAssetFiles: z.union([z.boolean(), z.lazy(() => CaseAssetFileFindManySchema)]).optional(),
  patients: z.union([z.boolean(), z.lazy(() => PatientFindManySchema)]).optional(),
  dentists: z.union([z.boolean(), z.lazy(() => DentistFindManySchema)]).optional(),
  staffAssignments: z.union([z.boolean(), z.lazy(() => CaseStaffAssignmentFindManySchema)]).optional(),
  LabStaff: z.union([z.boolean(), z.lazy(() => LabStaffFindManySchema)]).optional(),
  nextCaseNumber: z.boolean().optional(),
  caseActivityLogs: z.union([z.boolean(), z.lazy(() => CaseActivityLogFindManySchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => LabCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const LabSelectObjectSchema: z.ZodType<Prisma.LabSelect> = makeSchema() as unknown as z.ZodType<Prisma.LabSelect>;
export const LabSelectObjectZodSchema = makeSchema();
