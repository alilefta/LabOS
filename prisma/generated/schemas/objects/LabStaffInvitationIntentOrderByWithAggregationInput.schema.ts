import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { LabStaffInvitationIntentCountOrderByAggregateInputObjectSchema as LabStaffInvitationIntentCountOrderByAggregateInputObjectSchema } from './LabStaffInvitationIntentCountOrderByAggregateInput.schema';
import { LabStaffInvitationIntentMaxOrderByAggregateInputObjectSchema as LabStaffInvitationIntentMaxOrderByAggregateInputObjectSchema } from './LabStaffInvitationIntentMaxOrderByAggregateInput.schema';
import { LabStaffInvitationIntentMinOrderByAggregateInputObjectSchema as LabStaffInvitationIntentMinOrderByAggregateInputObjectSchema } from './LabStaffInvitationIntentMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  invitationId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  labStaffId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => LabStaffInvitationIntentCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => LabStaffInvitationIntentMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => LabStaffInvitationIntentMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const LabStaffInvitationIntentOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentOrderByWithAggregationInput>;
export const LabStaffInvitationIntentOrderByWithAggregationInputObjectZodSchema = makeSchema();
