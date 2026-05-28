import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  token: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  labStaffId: SortOrderSchema.optional(),
  roleToGrant: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const LabInvitationMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.LabInvitationMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationMaxOrderByAggregateInput>;
export const LabInvitationMaxOrderByAggregateInputObjectZodSchema = makeSchema();
