import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  inviterId: SortOrderSchema.optional()
}).strict();
export const InvitationMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.InvitationMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationMaxOrderByAggregateInput>;
export const InvitationMaxOrderByAggregateInputObjectZodSchema = makeSchema();
