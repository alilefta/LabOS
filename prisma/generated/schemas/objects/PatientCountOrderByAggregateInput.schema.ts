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
export const PatientCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PatientCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientCountOrderByAggregateInput>;
export const PatientCountOrderByAggregateInputObjectZodSchema = makeSchema();
