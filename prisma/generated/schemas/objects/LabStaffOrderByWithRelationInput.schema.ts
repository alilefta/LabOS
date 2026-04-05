import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema';
import { CaseStaffAssignmentOrderByRelationAggregateInputObjectSchema as CaseStaffAssignmentOrderByRelationAggregateInputObjectSchema } from './CaseStaffAssignmentOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  firstName: SortOrderSchema.optional(),
  lastName: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  email: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  phoneNumber: SortOrderSchema.optional(),
  avatarUrl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  isActive: SortOrderSchema.optional(),
  roleCategory: SortOrderSchema.optional(),
  jobTitle: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  specialization: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  commissionType: SortOrderSchema.optional(),
  commissionValue: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional(),
  cases: z.lazy(() => CaseStaffAssignmentOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const LabStaffOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.LabStaffOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffOrderByWithRelationInput>;
export const LabStaffOrderByWithRelationInputObjectZodSchema = makeSchema();
