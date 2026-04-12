import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CaseCountOrderByAggregateInputObjectSchema as CaseCountOrderByAggregateInputObjectSchema } from './CaseCountOrderByAggregateInput.schema';
import { CaseAvgOrderByAggregateInputObjectSchema as CaseAvgOrderByAggregateInputObjectSchema } from './CaseAvgOrderByAggregateInput.schema';
import { CaseMaxOrderByAggregateInputObjectSchema as CaseMaxOrderByAggregateInputObjectSchema } from './CaseMaxOrderByAggregateInput.schema';
import { CaseMinOrderByAggregateInputObjectSchema as CaseMinOrderByAggregateInputObjectSchema } from './CaseMinOrderByAggregateInput.schema';
import { CaseSumOrderByAggregateInputObjectSchema as CaseSumOrderByAggregateInputObjectSchema } from './CaseSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  patientId: SortOrderSchema.optional(),
  caseNumber: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  caseCategoryId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  grandTotal: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  clinicId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dentistId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  deadline: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => CaseCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => CaseAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CaseMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CaseMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => CaseSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CaseOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CaseOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseOrderByWithAggregationInput>;
export const CaseOrderByWithAggregationInputObjectZodSchema = makeSchema();
