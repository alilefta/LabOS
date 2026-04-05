import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  patientId: SortOrderSchema.optional(),
  caseNumber: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  caseCategoryId: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  grandTotal: SortOrderSchema.optional(),
  clinicId: SortOrderSchema.optional(),
  dentistId: SortOrderSchema.optional(),
  deadline: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CaseCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCountOrderByAggregateInput>;
export const CaseCountOrderByAggregateInputObjectZodSchema = makeSchema();
