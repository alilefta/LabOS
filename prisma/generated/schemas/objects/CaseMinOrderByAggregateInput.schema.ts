import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  patientId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  salesRepsId: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  grandTotal: SortOrderSchema.optional(),
  clinicId: SortOrderSchema.optional(),
  technicianId: SortOrderSchema.optional(),
  deadline: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CaseMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseMinOrderByAggregateInput>;
export const CaseMinOrderByAggregateInputObjectZodSchema = makeSchema();
