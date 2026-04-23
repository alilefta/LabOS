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
export const LabUserMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.LabUserMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserMaxOrderByAggregateInput>;
export const LabUserMaxOrderByAggregateInputObjectZodSchema = makeSchema();
