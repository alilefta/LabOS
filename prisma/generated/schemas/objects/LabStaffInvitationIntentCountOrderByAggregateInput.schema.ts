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
export const LabStaffInvitationIntentCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentCountOrderByAggregateInput>;
export const LabStaffInvitationIntentCountOrderByAggregateInputObjectZodSchema = makeSchema();
