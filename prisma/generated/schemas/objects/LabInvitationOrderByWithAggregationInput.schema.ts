import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { LabInvitationCountOrderByAggregateInputObjectSchema as LabInvitationCountOrderByAggregateInputObjectSchema } from './LabInvitationCountOrderByAggregateInput.schema';
import { LabInvitationMaxOrderByAggregateInputObjectSchema as LabInvitationMaxOrderByAggregateInputObjectSchema } from './LabInvitationMaxOrderByAggregateInput.schema';
import { LabInvitationMinOrderByAggregateInputObjectSchema as LabInvitationMinOrderByAggregateInputObjectSchema } from './LabInvitationMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  token: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  labStaffId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  roleToGrant: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => LabInvitationCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => LabInvitationMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => LabInvitationMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const LabInvitationOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.LabInvitationOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationOrderByWithAggregationInput>;
export const LabInvitationOrderByWithAggregationInputObjectZodSchema = makeSchema();
