import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema';
import { AuthUserOrderByWithRelationInputObjectSchema as AuthUserOrderByWithRelationInputObjectSchema } from './AuthUserOrderByWithRelationInput.schema';
import { LabStaffOrderByWithRelationInputObjectSchema as LabStaffOrderByWithRelationInputObjectSchema } from './LabStaffOrderByWithRelationInput.schema';
import { CaseActivityLogOrderByRelationAggregateInputObjectSchema as CaseActivityLogOrderByRelationAggregateInputObjectSchema } from './CaseActivityLogOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  authUserId: SortOrderSchema.optional(),
  labStaffId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  role: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  lastTimeActive: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional(),
  authUser: z.lazy(() => AuthUserOrderByWithRelationInputObjectSchema).optional(),
  labStaff: z.lazy(() => LabStaffOrderByWithRelationInputObjectSchema).optional(),
  activityLogs: z.lazy(() => CaseActivityLogOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const LabUserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.LabUserOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserOrderByWithRelationInput>;
export const LabUserOrderByWithRelationInputObjectZodSchema = makeSchema();
