import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  invitationId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  labStaffId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const LabStaffInvitationIntentMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentMinOrderByAggregateInput>;
export const LabStaffInvitationIntentMinOrderByAggregateInputObjectZodSchema = makeSchema();
