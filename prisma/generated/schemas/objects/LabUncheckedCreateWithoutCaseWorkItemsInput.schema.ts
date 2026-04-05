import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabSubscriptionPlanUncheckedCreateNestedOneWithoutLabInputObjectSchema as LabSubscriptionPlanUncheckedCreateNestedOneWithoutLabInputObjectSchema } from './LabSubscriptionPlanUncheckedCreateNestedOneWithoutLabInput.schema';
import { LabUserUncheckedCreateNestedManyWithoutLabInputObjectSchema as LabUserUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './LabUserUncheckedCreateNestedManyWithoutLabInput.schema';
import { ClinicUncheckedCreateNestedManyWithoutLabInputObjectSchema as ClinicUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './ClinicUncheckedCreateNestedManyWithoutLabInput.schema';
import { CaseUncheckedCreateNestedManyWithoutLabInputObjectSchema as CaseUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './CaseUncheckedCreateNestedManyWithoutLabInput.schema';
import { CaseCategoryUncheckedCreateNestedManyWithoutLabInputObjectSchema as CaseCategoryUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './CaseCategoryUncheckedCreateNestedManyWithoutLabInput.schema';
import { WorkTypeUncheckedCreateNestedManyWithoutLabInputObjectSchema as WorkTypeUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './WorkTypeUncheckedCreateNestedManyWithoutLabInput.schema';
import { ProductUncheckedCreateNestedManyWithoutLabInputObjectSchema as ProductUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './ProductUncheckedCreateNestedManyWithoutLabInput.schema';
import { SelectedToothUncheckedCreateNestedManyWithoutLabInputObjectSchema as SelectedToothUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './SelectedToothUncheckedCreateNestedManyWithoutLabInput.schema';
import { CasePricingPlanUncheckedCreateNestedManyWithoutLabInputObjectSchema as CasePricingPlanUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './CasePricingPlanUncheckedCreateNestedManyWithoutLabInput.schema';
import { CaseAssetFileUncheckedCreateNestedManyWithoutLabInputObjectSchema as CaseAssetFileUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './CaseAssetFileUncheckedCreateNestedManyWithoutLabInput.schema';
import { PatientUncheckedCreateNestedManyWithoutLabInputObjectSchema as PatientUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './PatientUncheckedCreateNestedManyWithoutLabInput.schema';
import { DentistUncheckedCreateNestedManyWithoutLabInputObjectSchema as DentistUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './DentistUncheckedCreateNestedManyWithoutLabInput.schema';
import { CaseStaffAssignmentUncheckedCreateNestedManyWithoutLabInputObjectSchema as CaseStaffAssignmentUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateNestedManyWithoutLabInput.schema';
import { LabStaffUncheckedCreateNestedManyWithoutLabInputObjectSchema as LabStaffUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './LabStaffUncheckedCreateNestedManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  brandAvatarUrl: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  labSubscriptionPlan: z.lazy(() => LabSubscriptionPlanUncheckedCreateNestedOneWithoutLabInputObjectSchema).optional(),
  users: z.lazy(() => LabUserUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  clinics: z.lazy(() => ClinicUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  cases: z.lazy(() => CaseUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  caseCategories: z.lazy(() => CaseCategoryUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  workTypes: z.lazy(() => WorkTypeUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  selectedTeeth: z.lazy(() => SelectedToothUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  casePricingPlans: z.lazy(() => CasePricingPlanUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  patients: z.lazy(() => PatientUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  dentists: z.lazy(() => DentistUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  staffAssignments: z.lazy(() => CaseStaffAssignmentUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  LabStaff: z.lazy(() => LabStaffUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional()
}).strict();
export const LabUncheckedCreateWithoutCaseWorkItemsInputObjectSchema: z.ZodType<Prisma.LabUncheckedCreateWithoutCaseWorkItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUncheckedCreateWithoutCaseWorkItemsInput>;
export const LabUncheckedCreateWithoutCaseWorkItemsInputObjectZodSchema = makeSchema();
