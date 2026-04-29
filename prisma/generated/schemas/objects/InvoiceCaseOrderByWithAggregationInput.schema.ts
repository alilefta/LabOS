import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { InvoiceCaseCountOrderByAggregateInputObjectSchema as InvoiceCaseCountOrderByAggregateInputObjectSchema } from './InvoiceCaseCountOrderByAggregateInput.schema';
import { InvoiceCaseAvgOrderByAggregateInputObjectSchema as InvoiceCaseAvgOrderByAggregateInputObjectSchema } from './InvoiceCaseAvgOrderByAggregateInput.schema';
import { InvoiceCaseMaxOrderByAggregateInputObjectSchema as InvoiceCaseMaxOrderByAggregateInputObjectSchema } from './InvoiceCaseMaxOrderByAggregateInput.schema';
import { InvoiceCaseMinOrderByAggregateInputObjectSchema as InvoiceCaseMinOrderByAggregateInputObjectSchema } from './InvoiceCaseMinOrderByAggregateInput.schema';
import { InvoiceCaseSumOrderByAggregateInputObjectSchema as InvoiceCaseSumOrderByAggregateInputObjectSchema } from './InvoiceCaseSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  invoiceId: SortOrderSchema.optional(),
  caseId: SortOrderSchema.optional(),
  caseTotal: SortOrderSchema.optional(),
  _count: z.lazy(() => InvoiceCaseCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => InvoiceCaseAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => InvoiceCaseMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => InvoiceCaseMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => InvoiceCaseSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const InvoiceCaseOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.InvoiceCaseOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseOrderByWithAggregationInput>;
export const InvoiceCaseOrderByWithAggregationInputObjectZodSchema = makeSchema();
