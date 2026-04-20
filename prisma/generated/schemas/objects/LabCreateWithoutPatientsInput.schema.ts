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
import { CaseAssetFileCreateNestedManyWithoutLabInputObjectSchema as CaseAssetFileCreateNestedManyWithoutLabInputObjectSchema } from './CaseAssetFileCreateNestedManyWithoutLabInput.schema';
import { DentistCreateNestedManyWithoutLabInputObjectSchema as DentistCreateNestedManyWithoutLabInputObjectSchema } from './DentistCreateNestedManyWithoutLabInput.schema';
import { CaseStaffAssignmentCreateNestedManyWithoutLabInputObjectSchema as CaseStaffAssignmentCreateNestedManyWithoutLabInputObjectSchema } from './CaseStaffAssignmentCreateNestedManyWithoutLabInput.schema';
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
  users: z.lazy(() => LabUserCreateNestedManyWithoutLabInputObjectSchema).optional(),
  clinics: z.lazy(() => ClinicCreateNestedManyWithoutLabInputObjectSchema).optional(),
  cases: z.lazy(() => CaseCreateNestedManyWithoutLabInputObjectSchema).optional(),
  caseCategories: z.lazy(() => CaseCategoryCreateNestedManyWithoutLabInputObjectSchema).optional(),
  workTypes: z.lazy(() => WorkTypeCreateNestedManyWithoutLabInputObjectSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutLabInputObjectSchema).optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemCreateNestedManyWithoutLabInputObjectSchema).optional(),
  selectedTeeth: z.lazy(() => SelectedToothCreateNestedManyWithoutLabInputObjectSchema).optional(),
  casePricingPlans: z.lazy(() => CasePricingPlanCreateNestedManyWithoutLabInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileCreateNestedManyWithoutLabInputObjectSchema).optional(),
  dentists: z.lazy(() => DentistCreateNestedManyWithoutLabInputObjectSchema).optional(),
  staffAssignments: z.lazy(() => CaseStaffAssignmentCreateNestedManyWithoutLabInputObjectSchema).optional(),
  LabStaff: z.lazy(() => LabStaffCreateNestedManyWithoutLabInputObjectSchema).optional(),
  caseActivityLogs: z.lazy(() => CaseActivityLogCreateNestedManyWithoutLabInputObjectSchema).optional()
}).strict();
export const LabCreateWithoutPatientsInputObjectSchema: z.ZodType<Prisma.LabCreateWithoutPatientsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateWithoutPatientsInput>;
export const LabCreateWithoutPatientsInputObjectZodSchema = makeSchema();
