import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { InvoiceCountOrderByAggregateInputObjectSchema as InvoiceCountOrderByAggregateInputObjectSchema } from './InvoiceCountOrderByAggregateInput.schema';
import { InvoiceAvgOrderByAggregateInputObjectSchema as InvoiceAvgOrderByAggregateInputObjectSchema } from './InvoiceAvgOrderByAggregateInput.schema';
import { InvoiceMaxOrderByAggregateInputObjectSchema as InvoiceMaxOrderByAggregateInputObjectSchema } from './InvoiceMaxOrderByAggregateInput.schema';
import { InvoiceMinOrderByAggregateInputObjectSchema as InvoiceMinOrderByAggregateInputObjectSchema } from './InvoiceMinOrderByAggregateInput.schema';
import { InvoiceSumOrderByAggregateInputObjectSchema as InvoiceSumOrderByAggregateInputObjectSchema } from './InvoiceSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  clinicId: SortOrderSchema.optional(),
  invoiceNumber: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  subtotal: SortOrderSchema.optional(),
  discountAmount: SortOrderSchema.optional(),
  appliedDiscountPercentage: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  discountReason: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  total: SortOrderSchema.optional(),
  amountPaid: SortOrderSchema.optional(),
  amountDue: SortOrderSchema.optional(),
  issuedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dueDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  publicToken: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  publicLinkExpiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  isActive: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => InvoiceCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => InvoiceAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => InvoiceMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => InvoiceMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => InvoiceSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const InvoiceOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.InvoiceOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceOrderByWithAggregationInput>;
export const InvoiceOrderByWithAggregationInputObjectZodSchema = makeSchema();
