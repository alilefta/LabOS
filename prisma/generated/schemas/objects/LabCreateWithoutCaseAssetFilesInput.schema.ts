import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabSubscriptionPlanCreateNestedOneWithoutLabInputObjectSchema as LabSubscriptionPlanCreateNestedOneWithoutLabInputObjectSchema } from './LabSubscriptionPlanCreateNestedOneWithoutLabInput.schema';
import { LabUserCreateNestedManyWithoutLabInputObjectSchema as LabUserCreateNestedManyWithoutLabInputObjectSchema } from './LabUserCreateNestedManyWithoutLabInput.schema';
import { ClinicCreateNestedManyWithoutLabInputObjectSchema as ClinicCreateNestedManyWithoutLabInputObjectSchema } from './ClinicCreateNestedManyWithoutLabInput.schema';
import { CaseCreateNestedManyWithoutLabInputObjectSchema as CaseCreateNestedManyWithoutLabInputObjectSchema } from './CaseCreateNestedManyWithoutLabInput.schema';
import { CaseCategoryCreateNestedManyWithoutLabInputObjectSchema as CaseCategoryCreateNestedManyWithoutLabInputObjectSchema } from './CaseCategoryCreateNestedManyWithoutLabInput.schema';
import { WorkTypeCreateNestedManyWithoutLabInputObjectSchema as WorkTypeCreateNestedManyWithoutLabInputObjectSchema } from './WorkTypeCreateNestedManyWithoutLabInput.schema';
import { ProductCreateNestedManyWithoutLabInputObjectSchema as ProductCreateNestedManyWithoutLabInputObjectSchema } from './ProductCreateNestedManyWithoutLabInput.schema';
import { CaseWorkItemCreateNestedManyWithoutLabInputObjectSchema as CaseWorkItemCreateNestedManyWithoutLabInputObjectSchema } from './CaseWorkItemCreateNestedManyWithoutLabInput.schema';
import { SelectedToothCreateNestedManyWithoutLabInputObjectSchema as SelectedToothCreateNestedManyWithoutLabInputObjectSchema } from './SelectedToothCreateNestedManyWithoutLabInput.schema';
import { CasePricingPlanCreateNestedManyWithoutLabInputObjectSchema as CasePricingPlanCreateNestedManyWithoutLabInputObjectSchema } from './CasePricingPlanCreateNestedManyWithoutLabInput.schema';
import { PatientCreateNestedManyWithoutLabInputObjectSchema as PatientCreateNestedManyWithoutLabInputObjectSchema } from './PatientCreateNestedManyWithoutLabInput.schema';
import { DentistCreateNestedManyWithoutLabInputObjectSchema as DentistCreateNestedManyWithoutLabInputObjectSchema } from './DentistCreateNestedManyWithoutLabInput.schema';
import { CaseStaffAssignmentCreateNestedManyWithoutLabInputObjectSchema as CaseStaffAssignmentCreateNestedManyWithoutLabInputObjectSchema } from './CaseStaffAssignmentCreateNestedManyWithoutLabInput.schema';
import { LabStaffCreateNestedManyWithoutLabInputObjectSchema as LabStaffCreateNestedManyWithoutLabInputObjectSchema } from './LabStaffCreateNestedManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  brandAvatarUrl: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  labSubscriptionPlan: z.lazy(() => LabSubscriptionPlanCreateNestedOneWithoutLabInputObjectSchema).optional(),
  users: z.lazy(() => LabUserCreateNestedManyWithoutLabInputObjectSchema).optional(),
  clinics: z.lazy(() => ClinicCreateNestedManyWithoutLabInputObjectSchema).optional(),
  cases: z.lazy(() => CaseCreateNestedManyWithoutLabInputObjectSchema).optional(),
  caseCategories: z.lazy(() => CaseCategoryCreateNestedManyWithoutLabInputObjectSchema).optional(),
  workTypes: z.lazy(() => WorkTypeCreateNestedManyWithoutLabInputObjectSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutLabInputObjectSchema).optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemCreateNestedManyWithoutLabInputObjectSchema).optional(),
  selectedTeeth: z.lazy(() => SelectedToothCreateNestedManyWithoutLabInputObjectSchema).optional(),
  casePricingPlans: z.lazy(() => CasePricingPlanCreateNestedManyWithoutLabInputObjectSchema).optional(),
  patients: z.lazy(() => PatientCreateNestedManyWithoutLabInputObjectSchema).optional(),
  dentists: z.lazy(() => DentistCreateNestedManyWithoutLabInputObjectSchema).optional(),
  staffAssignments: z.lazy(() => CaseStaffAssignmentCreateNestedManyWithoutLabInputObjectSchema).optional(),
  LabStaff: z.lazy(() => LabStaffCreateNestedManyWithoutLabInputObjectSchema).optional()
}).strict();
export const LabCreateWithoutCaseAssetFilesInputObjectSchema: z.ZodType<Prisma.LabCreateWithoutCaseAssetFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateWithoutCaseAssetFilesInput>;
export const LabCreateWithoutCaseAssetFilesInputObjectZodSchema = makeSchema();
