import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  slug: SortOrderSchema.optional(),
  logo: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  metadata: SortOrderSchema.optional()
}).strict();
export const OrganizationMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OrganizationMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationMaxOrderByAggregateInput>;
export const OrganizationMaxOrderByAggregateInputObjectZodSchema = makeSchema();
