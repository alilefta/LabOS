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
export const MemberCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MemberCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberCountOrderByAggregateInput>;
export const MemberCountOrderByAggregateInputObjectZodSchema = makeSchema();
