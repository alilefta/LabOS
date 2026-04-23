import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabSubscriptionPlanUncheckedCreateNestedOneWithoutLabInputObjectSchema as LabSubscriptionPlanUncheckedCreateNestedOneWithoutLabInputObjectSchema } from './LabSubscriptionPlanUncheckedCreateNestedOneWithoutLabInput.schema';
import { ClinicUncheckedCreateNestedManyWithoutLabInputObjectSchema as ClinicUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './ClinicUncheckedCreateNestedManyWithoutLabInput.schema';
import { CaseUncheckedCreateNestedManyWithoutLabInputObjectSchema as CaseUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './CaseUncheckedCreateNestedManyWithoutLabInput.schema';
import { CaseCategoryUncheckedCreateNestedManyWithoutLabInputObjectSchema as CaseCategoryUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './CaseCategoryUncheckedCreateNestedManyWithoutLabInput.schema';
import { WorkTypeUncheckedCreateNestedManyWithoutLabInputObjectSchema as WorkTypeUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './WorkTypeUncheckedCreateNestedManyWithoutLabInput.schema';
import { CaseWorkItemUncheckedCreateNestedManyWithoutLabInputObjectSchema as CaseWorkItemUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './CaseWorkItemUncheckedCreateNestedManyWithoutLabInput.schema';
import { SelectedToothUncheckedCreateNestedManyWithoutLabInputObjectSchema as SelectedToothUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './SelectedToothUncheckedCreateNestedManyWithoutLabInput.schema';
import { CasePricingPlanUncheckedCreateNestedManyWithoutLabInputObjectSchema as CasePricingPlanUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './CasePricingPlanUncheckedCreateNestedManyWithoutLabInput.schema';
import { CaseAssetFileUncheckedCreateNestedManyWithoutLabInputObjectSchema as CaseAssetFileUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './CaseAssetFileUncheckedCreateNestedManyWithoutLabInput.schema';
import { PatientUncheckedCreateNestedManyWithoutLabInputObjectSchema as PatientUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './PatientUncheckedCreateNestedManyWithoutLabInput.schema';
import { DentistUncheckedCreateNestedManyWithoutLabInputObjectSchema as DentistUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './DentistUncheckedCreateNestedManyWithoutLabInput.schema';
import { CaseStaffAssignmentUncheckedCreateNestedManyWithoutLabInputObjectSchema as CaseStaffAssignmentUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateNestedManyWithoutLabInput.schema';
import { LabUserUncheckedCreateNestedManyWithoutLabInputObjectSchema as LabUserUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './LabUserUncheckedCreateNestedManyWithoutLabInput.schema';
import { LabStaffUncheckedCreateNestedManyWithoutLabInputObjectSchema as LabStaffUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './LabStaffUncheckedCreateNestedManyWithoutLabInput.schema';
import { CaseActivityLogUncheckedCreateNestedManyWithoutLabInputObjectSchema as CaseActivityLogUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './CaseActivityLogUncheckedCreateNestedManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  brandAvatarUrl: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  nextCaseNumber: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  labSubscriptionPlan: z.lazy(() => LabSubscriptionPlanUncheckedCreateNestedOneWithoutLabInputObjectSchema).optional(),
  clinics: z.lazy(() => ClinicUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  cases: z.lazy(() => CaseUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  caseCategories: z.lazy(() => CaseCategoryUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  workTypes: z.lazy(() => WorkTypeUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  selectedTeeth: z.lazy(() => SelectedToothUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  casePricingPlans: z.lazy(() => CasePricingPlanUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  patients: z.lazy(() => PatientUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  dentists: z.lazy(() => DentistUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  staffAssignments: z.lazy(() => CaseStaffAssignmentUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  users: z.lazy(() => LabUserUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  staff: z.lazy(() => LabStaffUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  caseActivityLogs: z.lazy(() => CaseActivityLogUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional()
}).strict();
export const LabUncheckedCreateWithoutProductsInputObjectSchema: z.ZodType<Prisma.LabUncheckedCreateWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUncheckedCreateWithoutProductsInput>;
export const LabUncheckedCreateWithoutProductsInputObjectZodSchema = makeSchema();
