import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LabSubscriptionPlanUpdateOneWithoutLabNestedInputObjectSchema as LabSubscriptionPlanUpdateOneWithoutLabNestedInputObjectSchema } from './LabSubscriptionPlanUpdateOneWithoutLabNestedInput.schema';
import { LabUserUpdateManyWithoutLabNestedInputObjectSchema as LabUserUpdateManyWithoutLabNestedInputObjectSchema } from './LabUserUpdateManyWithoutLabNestedInput.schema';
import { ClinicUpdateManyWithoutLabNestedInputObjectSchema as ClinicUpdateManyWithoutLabNestedInputObjectSchema } from './ClinicUpdateManyWithoutLabNestedInput.schema';
import { CaseUpdateManyWithoutLabNestedInputObjectSchema as CaseUpdateManyWithoutLabNestedInputObjectSchema } from './CaseUpdateManyWithoutLabNestedInput.schema';
import { TechnicianUpdateManyWithoutLabNestedInputObjectSchema as TechnicianUpdateManyWithoutLabNestedInputObjectSchema } from './TechnicianUpdateManyWithoutLabNestedInput.schema';
import { SalesRepresentativeUpdateManyWithoutLabNestedInputObjectSchema as SalesRepresentativeUpdateManyWithoutLabNestedInputObjectSchema } from './SalesRepresentativeUpdateManyWithoutLabNestedInput.schema';
import { CaseCategoryUpdateManyWithoutLabNestedInputObjectSchema as CaseCategoryUpdateManyWithoutLabNestedInputObjectSchema } from './CaseCategoryUpdateManyWithoutLabNestedInput.schema';
import { WorkTypeUpdateManyWithoutLabNestedInputObjectSchema as WorkTypeUpdateManyWithoutLabNestedInputObjectSchema } from './WorkTypeUpdateManyWithoutLabNestedInput.schema';
import { ProductUpdateManyWithoutLabNestedInputObjectSchema as ProductUpdateManyWithoutLabNestedInputObjectSchema } from './ProductUpdateManyWithoutLabNestedInput.schema';
import { SelectedToothUpdateManyWithoutLabNestedInputObjectSchema as SelectedToothUpdateManyWithoutLabNestedInputObjectSchema } from './SelectedToothUpdateManyWithoutLabNestedInput.schema';
import { CasePricingPlanUpdateManyWithoutLabNestedInputObjectSchema as CasePricingPlanUpdateManyWithoutLabNestedInputObjectSchema } from './CasePricingPlanUpdateManyWithoutLabNestedInput.schema';
import { CaseAssetFileUpdateManyWithoutLabNestedInputObjectSchema as CaseAssetFileUpdateManyWithoutLabNestedInputObjectSchema } from './CaseAssetFileUpdateManyWithoutLabNestedInput.schema';
import { PatientUpdateManyWithoutLabNestedInputObjectSchema as PatientUpdateManyWithoutLabNestedInputObjectSchema } from './PatientUpdateManyWithoutLabNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  labSubscriptionPlan: z.lazy(() => LabSubscriptionPlanUpdateOneWithoutLabNestedInputObjectSchema).optional(),
  users: z.lazy(() => LabUserUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  clinics: z.lazy(() => ClinicUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  cases: z.lazy(() => CaseUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  technicians: z.lazy(() => TechnicianUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  salesReps: z.lazy(() => SalesRepresentativeUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  caseCategories: z.lazy(() => CaseCategoryUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  workTypes: z.lazy(() => WorkTypeUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  selectedTeeth: z.lazy(() => SelectedToothUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  casePricingPlans: z.lazy(() => CasePricingPlanUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  patient: z.lazy(() => PatientUpdateManyWithoutLabNestedInputObjectSchema).optional()
}).strict();
export const LabUpdateWithoutCaseWorkItemsInputObjectSchema: z.ZodType<Prisma.LabUpdateWithoutCaseWorkItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateWithoutCaseWorkItemsInput>;
export const LabUpdateWithoutCaseWorkItemsInputObjectZodSchema = makeSchema();
