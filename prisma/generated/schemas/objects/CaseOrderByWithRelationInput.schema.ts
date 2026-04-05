import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PatientOrderByWithRelationInputObjectSchema as PatientOrderByWithRelationInputObjectSchema } from './PatientOrderByWithRelationInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema';
import { CaseWorkItemOrderByRelationAggregateInputObjectSchema as CaseWorkItemOrderByRelationAggregateInputObjectSchema } from './CaseWorkItemOrderByRelationAggregateInput.schema';
import { CaseCategoryOrderByWithRelationInputObjectSchema as CaseCategoryOrderByWithRelationInputObjectSchema } from './CaseCategoryOrderByWithRelationInput.schema';
import { ClinicOrderByWithRelationInputObjectSchema as ClinicOrderByWithRelationInputObjectSchema } from './ClinicOrderByWithRelationInput.schema';
import { DentistOrderByWithRelationInputObjectSchema as DentistOrderByWithRelationInputObjectSchema } from './DentistOrderByWithRelationInput.schema';
import { CaseStaffAssignmentOrderByRelationAggregateInputObjectSchema as CaseStaffAssignmentOrderByRelationAggregateInputObjectSchema } from './CaseStaffAssignmentOrderByRelationAggregateInput.schema';
import { CaseAssetFileOrderByRelationAggregateInputObjectSchema as CaseAssetFileOrderByRelationAggregateInputObjectSchema } from './CaseAssetFileOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  patientId: SortOrderSchema.optional(),
  caseNumber: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  caseCategoryId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  grandTotal: SortOrderSchema.optional(),
  clinicId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dentistId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  deadline: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  patient: z.lazy(() => PatientOrderByWithRelationInputObjectSchema).optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional(),
  caseItems: z.lazy(() => CaseWorkItemOrderByRelationAggregateInputObjectSchema).optional(),
  caseCategory: z.lazy(() => CaseCategoryOrderByWithRelationInputObjectSchema).optional(),
  clinic: z.lazy(() => ClinicOrderByWithRelationInputObjectSchema).optional(),
  dentist: z.lazy(() => DentistOrderByWithRelationInputObjectSchema).optional(),
  staffAssignments: z.lazy(() => CaseStaffAssignmentOrderByRelationAggregateInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const CaseOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CaseOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseOrderByWithRelationInput>;
export const CaseOrderByWithRelationInputObjectZodSchema = makeSchema();
