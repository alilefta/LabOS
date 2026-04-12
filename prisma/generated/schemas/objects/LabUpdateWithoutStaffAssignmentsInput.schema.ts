import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LabSubscriptionPlanUpdateOneWithoutLabNestedInputObjectSchema as LabSubscriptionPlanUpdateOneWithoutLabNestedInputObjectSchema } from './LabSubscriptionPlanUpdateOneWithoutLabNestedInput.schema';
import { LabUserUpdateManyWithoutLabNestedInputObjectSchema as LabUserUpdateManyWithoutLabNestedInputObjectSchema } from './LabUserUpdateManyWithoutLabNestedInput.schema';
import { ClinicUpdateManyWithoutLabNestedInputObjectSchema as ClinicUpdateManyWithoutLabNestedInputObjectSchema } from './ClinicUpdateManyWithoutLabNestedInput.schema';
import { CaseUpdateManyWithoutLabNestedInputObjectSchema as CaseUpdateManyWithoutLabNestedInputObjectSchema } from './CaseUpdateManyWithoutLabNestedInput.schema';
import { CaseCategoryUpdateManyWithoutLabNestedInputObjectSchema as CaseCategoryUpdateManyWithoutLabNestedInputObjectSchema } from './CaseCategoryUpdateManyWithoutLabNestedInput.schema';
import { WorkTypeUpdateManyWithoutLabNestedInputObjectSchema as WorkTypeUpdateManyWithoutLabNestedInputObjectSchema } from './WorkTypeUpdateManyWithoutLabNestedInput.schema';
import { ProductUpdateManyWithoutLabNestedInputObjectSchema as ProductUpdateManyWithoutLabNestedInputObjectSchema } from './ProductUpdateManyWithoutLabNestedInput.schema';
import { CaseWorkItemUpdateManyWithoutLabNestedInputObjectSchema as CaseWorkItemUpdateManyWithoutLabNestedInputObjectSchema } from './CaseWorkItemUpdateManyWithoutLabNestedInput.schema';
import { SelectedToothUpdateManyWithoutLabNestedInputObjectSchema as SelectedToothUpdateManyWithoutLabNestedInputObjectSchema } from './SelectedToothUpdateManyWithoutLabNestedInput.schema';
import { CasePricingPlanUpdateManyWithoutLabNestedInputObjectSchema as CasePricingPlanUpdateManyWithoutLabNestedInputObjectSchema } from './CasePricingPlanUpdateManyWithoutLabNestedInput.schema';
import { CaseAssetFileUpdateManyWithoutLabNestedInputObjectSchema as CaseAssetFileUpdateManyWithoutLabNestedInputObjectSchema } from './CaseAssetFileUpdateManyWithoutLabNestedInput.schema';
import { PatientUpdateManyWithoutLabNestedInputObjectSchema as PatientUpdateManyWithoutLabNestedInputObjectSchema } from './PatientUpdateManyWithoutLabNestedInput.schema';
import { DentistUpdateManyWithoutLabNestedInputObjectSchema as DentistUpdateManyWithoutLabNestedInputObjectSchema } from './DentistUpdateManyWithoutLabNestedInput.schema';
import { LabStaffUpdateManyWithoutLabNestedInputObjectSchema as LabStaffUpdateManyWithoutLabNestedInputObjectSchema } from './LabStaffUpdateManyWithoutLabNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  slug: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  brandAvatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  subtitle: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  nextCaseNumber: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  labSubscriptionPlan: z.lazy(() => LabSubscriptionPlanUpdateOneWithoutLabNestedInputObjectSchema).optional(),
  users: z.lazy(() => LabUserUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  clinics: z.lazy(() => ClinicUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  cases: z.lazy(() => CaseUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  caseCategories: z.lazy(() => CaseCategoryUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  workTypes: z.lazy(() => WorkTypeUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  selectedTeeth: z.lazy(() => SelectedToothUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  casePricingPlans: z.lazy(() => CasePricingPlanUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  patients: z.lazy(() => PatientUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  dentists: z.lazy(() => DentistUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  LabStaff: z.lazy(() => LabStaffUpdateManyWithoutLabNestedInputObjectSchema).optional()
}).strict();
export const LabUpdateWithoutStaffAssignmentsInputObjectSchema: z.ZodType<Prisma.LabUpdateWithoutStaffAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateWithoutStaffAssignmentsInput>;
export const LabUpdateWithoutStaffAssignmentsInputObjectZodSchema = makeSchema();
