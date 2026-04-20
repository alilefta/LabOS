import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { LabSubscriptionPlanOrderByWithRelationInputObjectSchema as LabSubscriptionPlanOrderByWithRelationInputObjectSchema } from './LabSubscriptionPlanOrderByWithRelationInput.schema';
import { LabUserOrderByRelationAggregateInputObjectSchema as LabUserOrderByRelationAggregateInputObjectSchema } from './LabUserOrderByRelationAggregateInput.schema';
import { ClinicOrderByRelationAggregateInputObjectSchema as ClinicOrderByRelationAggregateInputObjectSchema } from './ClinicOrderByRelationAggregateInput.schema';
import { CaseOrderByRelationAggregateInputObjectSchema as CaseOrderByRelationAggregateInputObjectSchema } from './CaseOrderByRelationAggregateInput.schema';
import { CaseCategoryOrderByRelationAggregateInputObjectSchema as CaseCategoryOrderByRelationAggregateInputObjectSchema } from './CaseCategoryOrderByRelationAggregateInput.schema';
import { WorkTypeOrderByRelationAggregateInputObjectSchema as WorkTypeOrderByRelationAggregateInputObjectSchema } from './WorkTypeOrderByRelationAggregateInput.schema';
import { ProductOrderByRelationAggregateInputObjectSchema as ProductOrderByRelationAggregateInputObjectSchema } from './ProductOrderByRelationAggregateInput.schema';
import { CaseWorkItemOrderByRelationAggregateInputObjectSchema as CaseWorkItemOrderByRelationAggregateInputObjectSchema } from './CaseWorkItemOrderByRelationAggregateInput.schema';
import { SelectedToothOrderByRelationAggregateInputObjectSchema as SelectedToothOrderByRelationAggregateInputObjectSchema } from './SelectedToothOrderByRelationAggregateInput.schema';
import { CasePricingPlanOrderByRelationAggregateInputObjectSchema as CasePricingPlanOrderByRelationAggregateInputObjectSchema } from './CasePricingPlanOrderByRelationAggregateInput.schema';
import { CaseAssetFileOrderByRelationAggregateInputObjectSchema as CaseAssetFileOrderByRelationAggregateInputObjectSchema } from './CaseAssetFileOrderByRelationAggregateInput.schema';
import { PatientOrderByRelationAggregateInputObjectSchema as PatientOrderByRelationAggregateInputObjectSchema } from './PatientOrderByRelationAggregateInput.schema';
import { DentistOrderByRelationAggregateInputObjectSchema as DentistOrderByRelationAggregateInputObjectSchema } from './DentistOrderByRelationAggregateInput.schema';
import { CaseStaffAssignmentOrderByRelationAggregateInputObjectSchema as CaseStaffAssignmentOrderByRelationAggregateInputObjectSchema } from './CaseStaffAssignmentOrderByRelationAggregateInput.schema';
import { LabStaffOrderByRelationAggregateInputObjectSchema as LabStaffOrderByRelationAggregateInputObjectSchema } from './LabStaffOrderByRelationAggregateInput.schema';
import { CaseActivityLogOrderByRelationAggregateInputObjectSchema as CaseActivityLogOrderByRelationAggregateInputObjectSchema } from './CaseActivityLogOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  slug: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  brandAvatarUrl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  subtitle: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  nextCaseNumber: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  labSubscriptionPlan: z.lazy(() => LabSubscriptionPlanOrderByWithRelationInputObjectSchema).optional(),
  users: z.lazy(() => LabUserOrderByRelationAggregateInputObjectSchema).optional(),
  clinics: z.lazy(() => ClinicOrderByRelationAggregateInputObjectSchema).optional(),
  cases: z.lazy(() => CaseOrderByRelationAggregateInputObjectSchema).optional(),
  caseCategories: z.lazy(() => CaseCategoryOrderByRelationAggregateInputObjectSchema).optional(),
  workTypes: z.lazy(() => WorkTypeOrderByRelationAggregateInputObjectSchema).optional(),
  products: z.lazy(() => ProductOrderByRelationAggregateInputObjectSchema).optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemOrderByRelationAggregateInputObjectSchema).optional(),
  selectedTeeth: z.lazy(() => SelectedToothOrderByRelationAggregateInputObjectSchema).optional(),
  casePricingPlans: z.lazy(() => CasePricingPlanOrderByRelationAggregateInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileOrderByRelationAggregateInputObjectSchema).optional(),
  patients: z.lazy(() => PatientOrderByRelationAggregateInputObjectSchema).optional(),
  dentists: z.lazy(() => DentistOrderByRelationAggregateInputObjectSchema).optional(),
  staffAssignments: z.lazy(() => CaseStaffAssignmentOrderByRelationAggregateInputObjectSchema).optional(),
  LabStaff: z.lazy(() => LabStaffOrderByRelationAggregateInputObjectSchema).optional(),
  caseActivityLogs: z.lazy(() => CaseActivityLogOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const LabOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.LabOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabOrderByWithRelationInput>;
export const LabOrderByWithRelationInputObjectZodSchema = makeSchema();
