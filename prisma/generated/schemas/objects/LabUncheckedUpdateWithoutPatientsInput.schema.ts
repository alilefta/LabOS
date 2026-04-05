import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LabSubscriptionPlanUncheckedUpdateOneWithoutLabNestedInputObjectSchema as LabSubscriptionPlanUncheckedUpdateOneWithoutLabNestedInputObjectSchema } from './LabSubscriptionPlanUncheckedUpdateOneWithoutLabNestedInput.schema';
import { LabUserUncheckedUpdateManyWithoutLabNestedInputObjectSchema as LabUserUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './LabUserUncheckedUpdateManyWithoutLabNestedInput.schema';
import { ClinicUncheckedUpdateManyWithoutLabNestedInputObjectSchema as ClinicUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './ClinicUncheckedUpdateManyWithoutLabNestedInput.schema';
import { CaseUncheckedUpdateManyWithoutLabNestedInputObjectSchema as CaseUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './CaseUncheckedUpdateManyWithoutLabNestedInput.schema';
import { CaseCategoryUncheckedUpdateManyWithoutLabNestedInputObjectSchema as CaseCategoryUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './CaseCategoryUncheckedUpdateManyWithoutLabNestedInput.schema';
import { WorkTypeUncheckedUpdateManyWithoutLabNestedInputObjectSchema as WorkTypeUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './WorkTypeUncheckedUpdateManyWithoutLabNestedInput.schema';
import { ProductUncheckedUpdateManyWithoutLabNestedInputObjectSchema as ProductUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './ProductUncheckedUpdateManyWithoutLabNestedInput.schema';
import { CaseWorkItemUncheckedUpdateManyWithoutLabNestedInputObjectSchema as CaseWorkItemUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './CaseWorkItemUncheckedUpdateManyWithoutLabNestedInput.schema';
import { SelectedToothUncheckedUpdateManyWithoutLabNestedInputObjectSchema as SelectedToothUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './SelectedToothUncheckedUpdateManyWithoutLabNestedInput.schema';
import { CasePricingPlanUncheckedUpdateManyWithoutLabNestedInputObjectSchema as CasePricingPlanUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './CasePricingPlanUncheckedUpdateManyWithoutLabNestedInput.schema';
import { CaseAssetFileUncheckedUpdateManyWithoutLabNestedInputObjectSchema as CaseAssetFileUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './CaseAssetFileUncheckedUpdateManyWithoutLabNestedInput.schema';
import { DentistUncheckedUpdateManyWithoutLabNestedInputObjectSchema as DentistUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './DentistUncheckedUpdateManyWithoutLabNestedInput.schema';
import { CaseStaffAssignmentUncheckedUpdateManyWithoutLabNestedInputObjectSchema as CaseStaffAssignmentUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './CaseStaffAssignmentUncheckedUpdateManyWithoutLabNestedInput.schema';
import { LabStaffUncheckedUpdateManyWithoutLabNestedInputObjectSchema as LabStaffUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './LabStaffUncheckedUpdateManyWithoutLabNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  slug: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  brandAvatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  subtitle: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  labSubscriptionPlan: z.lazy(() => LabSubscriptionPlanUncheckedUpdateOneWithoutLabNestedInputObjectSchema).optional(),
  users: z.lazy(() => LabUserUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  clinics: z.lazy(() => ClinicUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  cases: z.lazy(() => CaseUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  caseCategories: z.lazy(() => CaseCategoryUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  workTypes: z.lazy(() => WorkTypeUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  selectedTeeth: z.lazy(() => SelectedToothUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  casePricingPlans: z.lazy(() => CasePricingPlanUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  dentists: z.lazy(() => DentistUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  staffAssignments: z.lazy(() => CaseStaffAssignmentUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  LabStaff: z.lazy(() => LabStaffUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional()
}).strict();
export const LabUncheckedUpdateWithoutPatientsInputObjectSchema: z.ZodType<Prisma.LabUncheckedUpdateWithoutPatientsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUncheckedUpdateWithoutPatientsInput>;
export const LabUncheckedUpdateWithoutPatientsInputObjectZodSchema = makeSchema();
