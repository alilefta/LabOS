import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  authUserId: SortOrderSchema.optional(),
  labStaffId: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  lastTimeActive: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const LabUserCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.LabUserCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserCountOrderByAggregateInput>;
export const LabUserCountOrderByAggregateInputObjectZodSchema = makeSchema();
