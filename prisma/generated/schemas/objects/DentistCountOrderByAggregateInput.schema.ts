import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  clinicId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  phoneNumber: SortOrderSchema.optional(),
  isOwner: SortOrderSchema.optional(),
  isDefault: SortOrderSchema.optional(),
  notes: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const DentistCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DentistCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistCountOrderByAggregateInput>;
export const DentistCountOrderByAggregateInputObjectZodSchema = makeSchema();
