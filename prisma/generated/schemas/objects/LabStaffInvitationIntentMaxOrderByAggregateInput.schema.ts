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
export const LabStaffInvitationIntentMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentMaxOrderByAggregateInput>;
export const LabStaffInvitationIntentMaxOrderByAggregateInputObjectZodSchema = makeSchema();
