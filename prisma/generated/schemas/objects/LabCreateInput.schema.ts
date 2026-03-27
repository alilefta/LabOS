import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabSubscriptionPlanCreateNestedOneWithoutLabInputObjectSchema as LabSubscriptionPlanCreateNestedOneWithoutLabInputObjectSchema } from './LabSubscriptionPlanCreateNestedOneWithoutLabInput.schema';
import { LabUserCreateNestedManyWithoutLabInputObjectSchema as LabUserCreateNestedManyWithoutLabInputObjectSchema } from './LabUserCreateNestedManyWithoutLabInput.schema';
import { ClinicCreateNestedManyWithoutLabInputObjectSchema as ClinicCreateNestedManyWithoutLabInputObjectSchema } from './ClinicCreateNestedManyWithoutLabInput.schema';
import { CaseCreateNestedManyWithoutLabInputObjectSchema as CaseCreateNestedManyWithoutLabInputObjectSchema } from './CaseCreateNestedManyWithoutLabInput.schema';
import { TechnicianCreateNestedManyWithoutLabInputObjectSchema as TechnicianCreateNestedManyWithoutLabInputObjectSchema } from './TechnicianCreateNestedManyWithoutLabInput.schema';
import { SalesRepresentativeCreateNestedManyWithoutLabInputObjectSchema as SalesRepresentativeCreateNestedManyWithoutLabInputObjectSchema } from './SalesRepresentativeCreateNestedManyWithoutLabInput.schema';
import { CaseCategoryCreateNestedManyWithoutLabInputObjectSchema as CaseCategoryCreateNestedManyWithoutLabInputObjectSchema } from './CaseCategoryCreateNestedManyWithoutLabInput.schema';
import { WorkTypeCreateNestedManyWithoutLabInputObjectSchema as WorkTypeCreateNestedManyWithoutLabInputObjectSchema } from './WorkTypeCreateNestedManyWithoutLabInput.schema';
import { ProductCreateNestedManyWithoutLabInputObjectSchema as ProductCreateNestedManyWithoutLabInputObjectSchema } from './ProductCreateNestedManyWithoutLabInput.schema';
import { CaseWorkItemCreateNestedManyWithoutLabInputObjectSchema as CaseWorkItemCreateNestedManyWithoutLabInputObjectSchema } from './CaseWorkItemCreateNestedManyWithoutLabInput.schema';
import { SelectedToothCreateNestedManyWithoutLabInputObjectSchema as SelectedToothCreateNestedManyWithoutLabInputObjectSchema } from './SelectedToothCreateNestedManyWithoutLabInput.schema';
import { CasePricingPlanCreateNestedManyWithoutLabInputObjectSchema as CasePricingPlanCreateNestedManyWithoutLabInputObjectSchema } from './CasePricingPlanCreateNestedManyWithoutLabInput.schema';
import { CaseAssetFileCreateNestedManyWithoutLabInputObjectSchema as CaseAssetFileCreateNestedManyWithoutLabInputObjectSchema } from './CaseAssetFileCreateNestedManyWithoutLabInput.schema';
import { PatientCreateNestedManyWithoutLabInputObjectSchema as PatientCreateNestedManyWithoutLabInputObjectSchema } from './PatientCreateNestedManyWithoutLabInput.schema';
import { DentistCreateNestedManyWithoutLabInputObjectSchema as DentistCreateNestedManyWithoutLabInputObjectSchema } from './DentistCreateNestedManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  brandAvatarUrl: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  labSubscriptionPlan: z.lazy(() => LabSubscriptionPlanCreateNestedOneWithoutLabInputObjectSchema).optional(),
  users: z.lazy(() => LabUserCreateNestedManyWithoutLabInputObjectSchema).optional(),
  clinics: z.lazy(() => ClinicCreateNestedManyWithoutLabInputObjectSchema).optional(),
  cases: z.lazy(() => CaseCreateNestedManyWithoutLabInputObjectSchema).optional(),
  technicians: z.lazy(() => TechnicianCreateNestedManyWithoutLabInputObjectSchema).optional(),
  salesReps: z.lazy(() => SalesRepresentativeCreateNestedManyWithoutLabInputObjectSchema).optional(),
  caseCategories: z.lazy(() => CaseCategoryCreateNestedManyWithoutLabInputObjectSchema).optional(),
  workTypes: z.lazy(() => WorkTypeCreateNestedManyWithoutLabInputObjectSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutLabInputObjectSchema).optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemCreateNestedManyWithoutLabInputObjectSchema).optional(),
  selectedTeeth: z.lazy(() => SelectedToothCreateNestedManyWithoutLabInputObjectSchema).optional(),
  casePricingPlans: z.lazy(() => CasePricingPlanCreateNestedManyWithoutLabInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileCreateNestedManyWithoutLabInputObjectSchema).optional(),
  patients: z.lazy(() => PatientCreateNestedManyWithoutLabInputObjectSchema).optional(),
  dentists: z.lazy(() => DentistCreateNestedManyWithoutLabInputObjectSchema).optional()
}).strict();
export const LabCreateInputObjectSchema: z.ZodType<Prisma.LabCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateInput>;
export const LabCreateInputObjectZodSchema = makeSchema();
