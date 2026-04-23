import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabSubscriptionPlanCreateNestedOneWithoutLabInputObjectSchema as LabSubscriptionPlanCreateNestedOneWithoutLabInputObjectSchema } from './LabSubscriptionPlanCreateNestedOneWithoutLabInput.schema';
import { ClinicCreateNestedManyWithoutLabInputObjectSchema as ClinicCreateNestedManyWithoutLabInputObjectSchema } from './ClinicCreateNestedManyWithoutLabInput.schema';
import { CaseCategoryCreateNestedManyWithoutLabInputObjectSchema as CaseCategoryCreateNestedManyWithoutLabInputObjectSchema } from './CaseCategoryCreateNestedManyWithoutLabInput.schema';
import { WorkTypeCreateNestedManyWithoutLabInputObjectSchema as WorkTypeCreateNestedManyWithoutLabInputObjectSchema } from './WorkTypeCreateNestedManyWithoutLabInput.schema';
import { ProductCreateNestedManyWithoutLabInputObjectSchema as ProductCreateNestedManyWithoutLabInputObjectSchema } from './ProductCreateNestedManyWithoutLabInput.schema';
import { CaseWorkItemCreateNestedManyWithoutLabInputObjectSchema as CaseWorkItemCreateNestedManyWithoutLabInputObjectSchema } from './CaseWorkItemCreateNestedManyWithoutLabInput.schema';
import { SelectedToothCreateNestedManyWithoutLabInputObjectSchema as SelectedToothCreateNestedManyWithoutLabInputObjectSchema } from './SelectedToothCreateNestedManyWithoutLabInput.schema';
import { CasePricingPlanCreateNestedManyWithoutLabInputObjectSchema as CasePricingPlanCreateNestedManyWithoutLabInputObjectSchema } from './CasePricingPlanCreateNestedManyWithoutLabInput.schema';
import { CaseAssetFileCreateNestedManyWithoutLabInputObjectSchema as CaseAssetFileCreateNestedManyWithoutLabInputObjectSchema } from './CaseAssetFileCreateNestedManyWithoutLabInput.schema';
import { PatientCreateNestedManyWithoutLabInputObjectSchema as PatientCreateNestedManyWithoutLabInputObjectSchema } from './PatientCreateNestedManyWithoutLabInput.schema';
import { DentistCreateNestedManyWithoutLabInputObjectSchema as DentistCreateNestedManyWithoutLabInputObjectSchema } from './DentistCreateNestedManyWithoutLabInput.schema';
import { CaseStaffAssignmentCreateNestedManyWithoutLabInputObjectSchema as CaseStaffAssignmentCreateNestedManyWithoutLabInputObjectSchema } from './CaseStaffAssignmentCreateNestedManyWithoutLabInput.schema';
import { LabUserCreateNestedManyWithoutLabInputObjectSchema as LabUserCreateNestedManyWithoutLabInputObjectSchema } from './LabUserCreateNestedManyWithoutLabInput.schema';
import { LabStaffCreateNestedManyWithoutLabInputObjectSchema as LabStaffCreateNestedManyWithoutLabInputObjectSchema } from './LabStaffCreateNestedManyWithoutLabInput.schema';
import { CaseActivityLogCreateNestedManyWithoutLabInputObjectSchema as CaseActivityLogCreateNestedManyWithoutLabInputObjectSchema } from './CaseActivityLogCreateNestedManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  brandAvatarUrl: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  nextCaseNumber: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  labSubscriptionPlan: z.lazy(() => LabSubscriptionPlanCreateNestedOneWithoutLabInputObjectSchema).optional(),
  clinics: z.lazy(() => ClinicCreateNestedManyWithoutLabInputObjectSchema).optional(),
  caseCategories: z.lazy(() => CaseCategoryCreateNestedManyWithoutLabInputObjectSchema).optional(),
  workTypes: z.lazy(() => WorkTypeCreateNestedManyWithoutLabInputObjectSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutLabInputObjectSchema).optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemCreateNestedManyWithoutLabInputObjectSchema).optional(),
  selectedTeeth: z.lazy(() => SelectedToothCreateNestedManyWithoutLabInputObjectSchema).optional(),
  casePricingPlans: z.lazy(() => CasePricingPlanCreateNestedManyWithoutLabInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileCreateNestedManyWithoutLabInputObjectSchema).optional(),
  patients: z.lazy(() => PatientCreateNestedManyWithoutLabInputObjectSchema).optional(),
  dentists: z.lazy(() => DentistCreateNestedManyWithoutLabInputObjectSchema).optional(),
  staffAssignments: z.lazy(() => CaseStaffAssignmentCreateNestedManyWithoutLabInputObjectSchema).optional(),
  users: z.lazy(() => LabUserCreateNestedManyWithoutLabInputObjectSchema).optional(),
  staff: z.lazy(() => LabStaffCreateNestedManyWithoutLabInputObjectSchema).optional(),
  caseActivityLogs: z.lazy(() => CaseActivityLogCreateNestedManyWithoutLabInputObjectSchema).optional()
}).strict();
export const LabCreateWithoutCasesInputObjectSchema: z.ZodType<Prisma.LabCreateWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateWithoutCasesInput>;
export const LabCreateWithoutCasesInputObjectZodSchema = makeSchema();
