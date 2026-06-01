import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema';
import { LabStaffOrderByWithRelationInputObjectSchema as LabStaffOrderByWithRelationInputObjectSchema } from './LabStaffOrderByWithRelationInput.schema';
import { CaseStaffAssignmentOrderByRelationAggregateInputObjectSchema as CaseStaffAssignmentOrderByRelationAggregateInputObjectSchema } from './CaseStaffAssignmentOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  payoutNumber: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  staffId: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  method: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  reference: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  paidAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional(),
  staff: z.lazy(() => LabStaffOrderByWithRelationInputObjectSchema).optional(),
  caseAssignments: z.lazy(() => CaseStaffAssignmentOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const StaffPayoutOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.StaffPayoutOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutOrderByWithRelationInput>;
export const StaffPayoutOrderByWithRelationInputObjectZodSchema = makeSchema();
