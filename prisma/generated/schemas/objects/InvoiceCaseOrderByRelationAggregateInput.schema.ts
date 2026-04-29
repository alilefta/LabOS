import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const InvoiceCaseOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.InvoiceCaseOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseOrderByRelationAggregateInput>;
export const InvoiceCaseOrderByRelationAggregateInputObjectZodSchema = makeSchema();
