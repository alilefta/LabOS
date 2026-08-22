import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const MemberMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MemberMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberMaxOrderByAggregateInput>;
export const MemberMaxOrderByAggregateInputObjectZodSchema = makeSchema();
