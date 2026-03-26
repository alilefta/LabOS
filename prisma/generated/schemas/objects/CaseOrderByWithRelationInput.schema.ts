import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PatientOrderByWithRelationInputObjectSchema as PatientOrderByWithRelationInputObjectSchema } from './PatientOrderByWithRelationInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema';
import { SalesRepresentativeOrderByWithRelationInputObjectSchema as SalesRepresentativeOrderByWithRelationInputObjectSchema } from './SalesRepresentativeOrderByWithRelationInput.schema';
import { CaseWorkItemOrderByRelationAggregateInputObjectSchema as CaseWorkItemOrderByRelationAggregateInputObjectSchema } from './CaseWorkItemOrderByRelationAggregateInput.schema';
import { CaseCategoryOrderByWithRelationInputObjectSchema as CaseCategoryOrderByWithRelationInputObjectSchema } from './CaseCategoryOrderByWithRelationInput.schema';
import { ClinicOrderByWithRelationInputObjectSchema as ClinicOrderByWithRelationInputObjectSchema } from './ClinicOrderByWithRelationInput.schema';
import { TechnicianOrderByWithRelationInputObjectSchema as TechnicianOrderByWithRelationInputObjectSchema } from './TechnicianOrderByWithRelationInput.schema';
import { CaseAssetFileOrderByRelationAggregateInputObjectSchema as CaseAssetFileOrderByRelationAggregateInputObjectSchema } from './CaseAssetFileOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  patientId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  salesRepsId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  caseCategoryId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  grandTotal: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  clinicId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  technicianId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  deadline: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  patient: z.lazy(() => PatientOrderByWithRelationInputObjectSchema).optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional(),
  salesReps: z.lazy(() => SalesRepresentativeOrderByWithRelationInputObjectSchema).optional(),
  caseItems: z.lazy(() => CaseWorkItemOrderByRelationAggregateInputObjectSchema).optional(),
  caseCategory: z.lazy(() => CaseCategoryOrderByWithRelationInputObjectSchema).optional(),
  clinic: z.lazy(() => ClinicOrderByWithRelationInputObjectSchema).optional(),
  Technician: z.lazy(() => TechnicianOrderByWithRelationInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const CaseOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CaseOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseOrderByWithRelationInput>;
export const CaseOrderByWithRelationInputObjectZodSchema = makeSchema();
