import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  notes: SortOrderSchema.optional(),
  age: SortOrderSchema.optional(),
  gender: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const PatientMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PatientMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientMaxOrderByAggregateInput>;
export const PatientMaxOrderByAggregateInputObjectZodSchema = makeSchema();
