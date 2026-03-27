import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ClinicOrderByWithRelationInputObjectSchema as ClinicOrderByWithRelationInputObjectSchema } from './ClinicOrderByWithRelationInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema';
import { CaseOrderByRelationAggregateInputObjectSchema as CaseOrderByRelationAggregateInputObjectSchema } from './CaseOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  clinicId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  email: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  phoneNumber: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  isOwner: SortOrderSchema.optional(),
  isDefault: SortOrderSchema.optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  clinic: z.lazy(() => ClinicOrderByWithRelationInputObjectSchema).optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional(),
  cases: z.lazy(() => CaseOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const DentistOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.DentistOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistOrderByWithRelationInput>;
export const DentistOrderByWithRelationInputObjectZodSchema = makeSchema();
