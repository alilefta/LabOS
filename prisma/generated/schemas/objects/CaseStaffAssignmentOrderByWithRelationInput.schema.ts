import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CaseOrderByWithRelationInputObjectSchema as CaseOrderByWithRelationInputObjectSchema } from './CaseOrderByWithRelationInput.schema';
import { LabStaffOrderByWithRelationInputObjectSchema as LabStaffOrderByWithRelationInputObjectSchema } from './LabStaffOrderByWithRelationInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  caseId: SortOrderSchema.optional(),
  staffId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  roleCategory: SortOrderSchema.optional(),
  commissionType: SortOrderSchema.optional(),
  commissionValue: SortOrderSchema.optional(),
  commissionTotal: SortOrderSchema.optional(),
  isPaid: SortOrderSchema.optional(),
  paidAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  dentalCase: z.lazy(() => CaseOrderByWithRelationInputObjectSchema).optional(),
  staff: z.lazy(() => LabStaffOrderByWithRelationInputObjectSchema).optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const CaseStaffAssignmentOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentOrderByWithRelationInput>;
export const CaseStaffAssignmentOrderByWithRelationInputObjectZodSchema = makeSchema();
