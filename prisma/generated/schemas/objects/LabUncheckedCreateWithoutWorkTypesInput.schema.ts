import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabSubscriptionPlanUncheckedCreateNestedOneWithoutLabInputObjectSchema as LabSubscriptionPlanUncheckedCreateNestedOneWithoutLabInputObjectSchema } from './LabSubscriptionPlanUncheckedCreateNestedOneWithoutLabInput.schema';
import { LabUserUncheckedCreateNestedManyWithoutLabInputObjectSchema as LabUserUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './LabUserUncheckedCreateNestedManyWithoutLabInput.schema';
import { ClinicUncheckedCreateNestedManyWithoutLabInputObjectSchema as ClinicUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './ClinicUncheckedCreateNestedManyWithoutLabInput.schema';
import { CaseUncheckedCreateNestedManyWithoutLabInputObjectSchema as CaseUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './CaseUncheckedCreateNestedManyWithoutLabInput.schema';
import { TechnicianUncheckedCreateNestedManyWithoutLabInputObjectSchema as TechnicianUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './TechnicianUncheckedCreateNestedManyWithoutLabInput.schema';
import { SalesRepresentativeUncheckedCreateNestedManyWithoutLabInputObjectSchema as SalesRepresentativeUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './SalesRepresentativeUncheckedCreateNestedManyWithoutLabInput.schema';
import { CaseCategoryUncheckedCreateNestedManyWithoutLabInputObjectSchema as CaseCategoryUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './CaseCategoryUncheckedCreateNestedManyWithoutLabInput.schema';
import { ProductUncheckedCreateNestedManyWithoutLabInputObjectSchema as ProductUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './ProductUncheckedCreateNestedManyWithoutLabInput.schema';
import { CaseWorkItemUncheckedCreateNestedManyWithoutLabInputObjectSchema as CaseWorkItemUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './CaseWorkItemUncheckedCreateNestedManyWithoutLabInput.schema';
import { SelectedToothUncheckedCreateNestedManyWithoutLabInputObjectSchema as SelectedToothUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './SelectedToothUncheckedCreateNestedManyWithoutLabInput.schema';
import { CasePricingPlanUncheckedCreateNestedManyWithoutLabInputObjectSchema as CasePricingPlanUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './CasePricingPlanUncheckedCreateNestedManyWithoutLabInput.schema';
import { CaseAssetFileUncheckedCreateNestedManyWithoutLabInputObjectSchema as CaseAssetFileUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './CaseAssetFileUncheckedCreateNestedManyWithoutLabInput.schema';
import { PatientUncheckedCreateNestedManyWithoutLabInputObjectSchema as PatientUncheckedCreateNestedManyWithoutLabInputObjectSchema } from './PatientUncheckedCreateNestedManyWithoutLabInput.schema'

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
  technicians: z.lazy(() => TechnicianUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  salesReps: z.lazy(() => SalesRepresentativeUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  caseCategories: z.lazy(() => CaseCategoryUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  selectedTeeth: z.lazy(() => SelectedToothUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  casePricingPlans: z.lazy(() => CasePricingPlanUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional(),
  patients: z.lazy(() => PatientUncheckedCreateNestedManyWithoutLabInputObjectSchema).optional()
}).strict();
export const LabUncheckedCreateWithoutWorkTypesInputObjectSchema: z.ZodType<Prisma.LabUncheckedCreateWithoutWorkTypesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUncheckedCreateWithoutWorkTypesInput>;
export const LabUncheckedCreateWithoutWorkTypesInputObjectZodSchema = makeSchema();
