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
export const DentistMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DentistMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistMaxOrderByAggregateInput>;
export const DentistMaxOrderByAggregateInputObjectZodSchema = makeSchema();
