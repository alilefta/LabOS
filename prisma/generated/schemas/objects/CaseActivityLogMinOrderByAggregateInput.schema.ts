import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  caseId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  actorId: SortOrderSchema.optional(),
  actorName: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  summary: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const CaseActivityLogMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseActivityLogMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogMinOrderByAggregateInput>;
export const CaseActivityLogMinOrderByAggregateInputObjectZodSchema = makeSchema();
