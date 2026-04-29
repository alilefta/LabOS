import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { InvoicePaymentCountOrderByAggregateInputObjectSchema as InvoicePaymentCountOrderByAggregateInputObjectSchema } from './InvoicePaymentCountOrderByAggregateInput.schema';
import { InvoicePaymentAvgOrderByAggregateInputObjectSchema as InvoicePaymentAvgOrderByAggregateInputObjectSchema } from './InvoicePaymentAvgOrderByAggregateInput.schema';
import { InvoicePaymentMaxOrderByAggregateInputObjectSchema as InvoicePaymentMaxOrderByAggregateInputObjectSchema } from './InvoicePaymentMaxOrderByAggregateInput.schema';
import { InvoicePaymentMinOrderByAggregateInputObjectSchema as InvoicePaymentMinOrderByAggregateInputObjectSchema } from './InvoicePaymentMinOrderByAggregateInput.schema';
import { InvoicePaymentSumOrderByAggregateInputObjectSchema as InvoicePaymentSumOrderByAggregateInputObjectSchema } from './InvoicePaymentSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  invoiceId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  method: SortOrderSchema.optional(),
  reference: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  paidAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => InvoicePaymentCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => InvoicePaymentAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => InvoicePaymentMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => InvoicePaymentMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => InvoicePaymentSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const InvoicePaymentOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.InvoicePaymentOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentOrderByWithAggregationInput>;
export const InvoicePaymentOrderByWithAggregationInputObjectZodSchema = makeSchema();
