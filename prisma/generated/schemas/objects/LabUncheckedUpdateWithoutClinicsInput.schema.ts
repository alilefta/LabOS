import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LabSubscriptionPlanUncheckedUpdateOneWithoutLabNestedInputObjectSchema as LabSubscriptionPlanUncheckedUpdateOneWithoutLabNestedInputObjectSchema } from './LabSubscriptionPlanUncheckedUpdateOneWithoutLabNestedInput.schema';
import { LabUserUncheckedUpdateManyWithoutLabNestedInputObjectSchema as LabUserUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './LabUserUncheckedUpdateManyWithoutLabNestedInput.schema';
import { CaseUncheckedUpdateManyWithoutLabNestedInputObjectSchema as CaseUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './CaseUncheckedUpdateManyWithoutLabNestedInput.schema';
import { TechnicianUncheckedUpdateManyWithoutLabNestedInputObjectSchema as TechnicianUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './TechnicianUncheckedUpdateManyWithoutLabNestedInput.schema';
import { SalesRepresentativeUncheckedUpdateManyWithoutLabNestedInputObjectSchema as SalesRepresentativeUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './SalesRepresentativeUncheckedUpdateManyWithoutLabNestedInput.schema';
import { CaseCategoryUncheckedUpdateManyWithoutLabNestedInputObjectSchema as CaseCategoryUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './CaseCategoryUncheckedUpdateManyWithoutLabNestedInput.schema';
import { WorkTypeUncheckedUpdateManyWithoutLabNestedInputObjectSchema as WorkTypeUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './WorkTypeUncheckedUpdateManyWithoutLabNestedInput.schema';
import { ProductUncheckedUpdateManyWithoutLabNestedInputObjectSchema as ProductUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './ProductUncheckedUpdateManyWithoutLabNestedInput.schema';
import { CaseWorkItemUncheckedUpdateManyWithoutLabNestedInputObjectSchema as CaseWorkItemUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './CaseWorkItemUncheckedUpdateManyWithoutLabNestedInput.schema';
import { SelectedToothUncheckedUpdateManyWithoutLabNestedInputObjectSchema as SelectedToothUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './SelectedToothUncheckedUpdateManyWithoutLabNestedInput.schema';
import { CasePricingPlanUncheckedUpdateManyWithoutLabNestedInputObjectSchema as CasePricingPlanUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './CasePricingPlanUncheckedUpdateManyWithoutLabNestedInput.schema';
import { CaseAssetFileUncheckedUpdateManyWithoutLabNestedInputObjectSchema as CaseAssetFileUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './CaseAssetFileUncheckedUpdateManyWithoutLabNestedInput.schema';
import { PatientUncheckedUpdateManyWithoutLabNestedInputObjectSchema as PatientUncheckedUpdateManyWithoutLabNestedInputObjectSchema } from './PatientUncheckedUpdateManyWithoutLabNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  labSubscriptionPlan: z.lazy(() => LabSubscriptionPlanUncheckedUpdateOneWithoutLabNestedInputObjectSchema).optional(),
  users: z.lazy(() => LabUserUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  cases: z.lazy(() => CaseUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  technicians: z.lazy(() => TechnicianUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  salesReps: z.lazy(() => SalesRepresentativeUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  caseCategories: z.lazy(() => CaseCategoryUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  workTypes: z.lazy(() => WorkTypeUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  selectedTeeth: z.lazy(() => SelectedToothUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  casePricingPlans: z.lazy(() => CasePricingPlanUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  patient: z.lazy(() => PatientUncheckedUpdateManyWithoutLabNestedInputObjectSchema).optional()
}).strict();
export const LabUncheckedUpdateWithoutClinicsInputObjectSchema: z.ZodType<Prisma.LabUncheckedUpdateWithoutClinicsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUncheckedUpdateWithoutClinicsInput>;
export const LabUncheckedUpdateWithoutClinicsInputObjectZodSchema = makeSchema();
