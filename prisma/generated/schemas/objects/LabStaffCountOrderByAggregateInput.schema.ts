import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  firstName: SortOrderSchema.optional(),
  lastName: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  phoneNumber: SortOrderSchema.optional(),
  avatarUrl: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  roleCategory: SortOrderSchema.optional(),
  jobTitle: SortOrderSchema.optional(),
  specialization: SortOrderSchema.optional(),
  commissionType: SortOrderSchema.optional(),
  commissionValue: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const LabStaffCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.LabStaffCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCountOrderByAggregateInput>;
export const LabStaffCountOrderByAggregateInputObjectZodSchema = makeSchema();
