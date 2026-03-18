import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { LabSubscriptionPlanNullableScalarRelationFilterObjectSchema as LabSubscriptionPlanNullableScalarRelationFilterObjectSchema } from './LabSubscriptionPlanNullableScalarRelationFilter.schema';
import { LabSubscriptionPlanWhereInputObjectSchema as LabSubscriptionPlanWhereInputObjectSchema } from './LabSubscriptionPlanWhereInput.schema';
import { LabUserListRelationFilterObjectSchema as LabUserListRelationFilterObjectSchema } from './LabUserListRelationFilter.schema';
import { ClinicListRelationFilterObjectSchema as ClinicListRelationFilterObjectSchema } from './ClinicListRelationFilter.schema';
import { CaseListRelationFilterObjectSchema as CaseListRelationFilterObjectSchema } from './CaseListRelationFilter.schema';
import { TechnicianListRelationFilterObjectSchema as TechnicianListRelationFilterObjectSchema } from './TechnicianListRelationFilter.schema';
import { SalesRepresentativeListRelationFilterObjectSchema as SalesRepresentativeListRelationFilterObjectSchema } from './SalesRepresentativeListRelationFilter.schema';
import { CaseCategoryListRelationFilterObjectSchema as CaseCategoryListRelationFilterObjectSchema } from './CaseCategoryListRelationFilter.schema';
import { WorkTypeListRelationFilterObjectSchema as WorkTypeListRelationFilterObjectSchema } from './WorkTypeListRelationFilter.schema';
import { ProductListRelationFilterObjectSchema as ProductListRelationFilterObjectSchema } from './ProductListRelationFilter.schema';
import { CaseWorkItemListRelationFilterObjectSchema as CaseWorkItemListRelationFilterObjectSchema } from './CaseWorkItemListRelationFilter.schema';
import { SelectedToothListRelationFilterObjectSchema as SelectedToothListRelationFilterObjectSchema } from './SelectedToothListRelationFilter.schema';
import { CasePricingPlanListRelationFilterObjectSchema as CasePricingPlanListRelationFilterObjectSchema } from './CasePricingPlanListRelationFilter.schema';
import { CaseAssetFileListRelationFilterObjectSchema as CaseAssetFileListRelationFilterObjectSchema } from './CaseAssetFileListRelationFilter.schema';
import { PatientListRelationFilterObjectSchema as PatientListRelationFilterObjectSchema } from './PatientListRelationFilter.schema'

const labwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => LabWhereInputObjectSchema), z.lazy(() => LabWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => LabWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => LabWhereInputObjectSchema), z.lazy(() => LabWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  labSubscriptionPlan: z.union([z.lazy(() => LabSubscriptionPlanNullableScalarRelationFilterObjectSchema), z.lazy(() => LabSubscriptionPlanWhereInputObjectSchema)]).optional(),
  users: z.lazy(() => LabUserListRelationFilterObjectSchema).optional(),
  clinics: z.lazy(() => ClinicListRelationFilterObjectSchema).optional(),
  cases: z.lazy(() => CaseListRelationFilterObjectSchema).optional(),
  technicians: z.lazy(() => TechnicianListRelationFilterObjectSchema).optional(),
  salesReps: z.lazy(() => SalesRepresentativeListRelationFilterObjectSchema).optional(),
  caseCategories: z.lazy(() => CaseCategoryListRelationFilterObjectSchema).optional(),
  workTypes: z.lazy(() => WorkTypeListRelationFilterObjectSchema).optional(),
  products: z.lazy(() => ProductListRelationFilterObjectSchema).optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemListRelationFilterObjectSchema).optional(),
  selectedTeeth: z.lazy(() => SelectedToothListRelationFilterObjectSchema).optional(),
  casePricingPlans: z.lazy(() => CasePricingPlanListRelationFilterObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileListRelationFilterObjectSchema).optional(),
  patient: z.lazy(() => PatientListRelationFilterObjectSchema).optional()
}).strict();
export const LabWhereInputObjectSchema: z.ZodType<Prisma.LabWhereInput> = labwhereinputSchema as unknown as z.ZodType<Prisma.LabWhereInput>;
export const LabWhereInputObjectZodSchema = labwhereinputSchema;
